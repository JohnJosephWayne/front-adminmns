import {User} from "./user";

export interface Absence {
  push(absence: Absence): unknown;

  validity: boolean;
  user:User

}
