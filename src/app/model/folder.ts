import {User} from "./user";

export interface Document {
  name: string;
}

export interface Folder {
  push(folder: Folder): unknown;

  id: number;
  validity: boolean;
  user:User;
  documentList: Document[];

}
