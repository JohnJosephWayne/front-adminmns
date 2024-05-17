import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Folder} from "../model/folder";

@Injectable({
  providedIn: 'root'
})
export class StudentFolderServiceService {

  http: HttpClient = inject(HttpClient);

  readonly _studentFolder: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([])
  readonly _listFolder: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([]);


  refresh() {
    this.http
      .get<Folder[]>("http://localhost:8080/student-inscription-folder/list")
      .subscribe((invalidFolder: Folder[]) => {
        let filteredFolder = invalidFolder
          .filter(folder => folder.validity === null);
        this._studentFolder.next(filteredFolder);
      });
  }
  getListFolder() {
    this.http
      .get<Folder[]>("http://localhost:8080/student-inscription-folder/list")
      .subscribe((folderList: Folder[]) => {
        this._listFolder.next(folderList);
      });
  }
}
