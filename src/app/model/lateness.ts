import {User} from "./user";

export interface Lateness {

  id: number;
  validity: boolean;
  user:User;
}
