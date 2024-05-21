import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "./model/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {

  readonly _connectedUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  http: HttpClient = inject(HttpClient);

  constructor() {}

  authentificationAvecJwtLocalStorage() {
    const jwt = localStorage.getItem('jwt');

    if (jwt != null) {
      const splitJwt = jwt.split('.');
      const bodyBase64 = splitJwt[1];
      const bodyJson = window.atob(bodyBase64);
      const body = JSON.parse(bodyJson);

      this.http
        .get("http://localhost:8080/user-by-email/" + body.sub)
        .subscribe((userInfo: any) => {

          this._connectedUser.next(userInfo);
        });

    } else {
      this._connectedUser.next(null);
    }
  }

  deconnexion() {
    localStorage.removeItem('jwt');
    this._connectedUser.next(null);
  }


}
