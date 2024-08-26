import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Folder} from "../model/folder";
import {User} from "../model/user";


@Injectable({
  providedIn: 'root'
})
export class FolderServiceService {

  http: HttpClient = inject(HttpClient);

  readonly _invalidFolders: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([])
  readonly _listFolders: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([]);


  refresh() {
    this.http
      .get<Folder[]>("http://localhost:8080/student-inscription-folder/list")
      .subscribe((invalidFolder: Folder[]) => {
        let filteredFolder = invalidFolder.filter(folder => folder.validity === null);
        this._invalidFolders.next(filteredFolder);
      });
  }

  getListFolder() {
    this.http
      .get<Folder[]>("http://localhost:8080/student-inscription-folder/list")
      .subscribe((folderList: Folder[]) => {
        this._listFolders.next(folderList);
      })
    return this._listFolders;
  }
}


