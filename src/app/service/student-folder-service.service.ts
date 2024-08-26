import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, pipe} from "rxjs";
import {Folder} from "../model/folder";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentFolderServiceService {

  http: HttpClient = inject(HttpClient);

  _studentFolders = new BehaviorSubject<Folder[]>([]);
  _listFolders = new BehaviorSubject<Folder[]>([]);
  _listFilteredbyId = new BehaviorSubject<Folder[]>([]);
  _listbyId = new BehaviorSubject<Folder[]>([]);


  refresh() {
    this.http
      .get<Folder[]>("http://localhost:8080/student-inscription-folder/list")
      .subscribe((invalidFolder: Folder[]) => {
        let filteredFolder = invalidFolder
          .filter(folder => folder.validity === null);
        this._studentFolders.next(filteredFolder);
      });
  }
  getListFolder() {
    this.http
      .get<Folder[]>("http://localhost:8080/student-inscription-folder/list")
      .subscribe((folderList: Folder[]) => {
        this._listFolders.next(folderList);
      });
  }
  getListFilteredFoldersById(id: number): void {
    this.http.get<Folder[]>("http://localhost:8080/student-inscription-folder/" + {id})
      .pipe(
        tap(filteredFolders => {
          const filteredFolderById = filteredFolders.filter(folder => folder.validity === null || folder.validity === false);
          this._listFilteredbyId.next(filteredFolderById);
        })
      ).subscribe();
  }

  getListFoldersById(id: number): Observable<Folder[]> {
    this.http.get<Folder[]>("http://localhost:8080/student-inscription-folder/" + {id})
      .pipe(
        tap(foldersList => this._listbyId.next(foldersList))
      ).subscribe();
    return this._listbyId.asObservable();
  }
}
