import {User} from "./user";

export interface Absence {
  push(absence: Absence): unknown;

  id: number;
  validity: boolean;
  user:User

}
