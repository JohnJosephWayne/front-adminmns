import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Folder } from "../model/folder";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentFolderService {

  http: HttpClient = inject(HttpClient);

  private readonly baseUrl = "http://localhost:8080/student-inscription-folder";
  private readonly userUrl = "http://localhost:8080/users/folders";

  _studentFolders = new BehaviorSubject<Folder[]>([]);
  _listFolders = new BehaviorSubject<Folder[]>([]);
  _listFilteredbyId = new BehaviorSubject<Folder[]>([]);
  _listbyId = new BehaviorSubject<Folder[]>([]);


  refresh(): void {
    this.http.get<Folder[]>(`${this.baseUrl}/list`)
      .pipe(
        tap(invalidFolders => {
          const filteredFolders = invalidFolders.filter(folder => folder.validity === null || folder.validity === false);
          this._studentFolders.next(filteredFolders);
        })
      ).subscribe();
  }

  getListFolders(): Observable<Folder[]> {
    this.http.get<Folder[]>(`${this.baseUrl}/list`)
      .pipe(
        tap(folderList => this._listFolders.next(folderList))
      ).subscribe();
    return this._listFolders.asObservable();
  }

  getListFilteredFoldersById(): void {
    this.http.get<Folder[]>(this.userUrl)
      .pipe(
        tap(filteredFolders => {
          const filteredFolderById = filteredFolders.filter(folder => folder.validity === null || folder.validity === false);
          this._listFilteredbyId.next(filteredFolderById);
        })
      ).subscribe();
  }

  getListFoldersById(): Observable<Folder[]> {
    this.http.get<Folder[]>(this.userUrl)
      .pipe(
        tap(foldersList => this._listbyId.next(foldersList))
      ).subscribe();
    return this._listbyId.asObservable();
  }

  deleteFolder(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        tap(() => {
          const updatedList = this._listFolders.value.filter(folder => folder.id !== id);
          this._listFolders.next(updatedList);
        })
      );
  }
}
