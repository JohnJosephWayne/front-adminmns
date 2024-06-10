import {User} from "./user";

export interface Lateness {
  push(lateness: Lateness): unknown;

  id: number;
  validity: boolean;
  user:User

}
