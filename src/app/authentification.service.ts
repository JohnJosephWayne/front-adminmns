import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom, lastValueFrom, Observable, pipe} from "rxjs";
import {User} from "./model/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {

  readonly _connectedUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  http: HttpClient = inject(HttpClient);

  async getConnectedUser(): Promise<User | null>   {
    const jwt = localStorage.getItem('jwt');

    if(jwt != null) {

      const splitJwt = jwt.split('.');
      const bodyBase64 = splitJwt[1];
      const bodyJson = window.atob(bodyBase64);
      const body = JSON.parse(bodyJson);


      //si l'utilisateur est connecté mais que ses informations n'ont pas encore été récupérées
      if(this._connectedUser.value == null) {

        const user = await firstValueFrom<User>(this.http
          .get<User>("http://localhost:8080/users/user-by-email/" + body.sub));

        this._connectedUser.next(user);

      }

      return firstValueFrom(this._connectedUser);
    }
    else {
      return Promise.resolve(null);
    }
  }

  deconnexion() {
    localStorage.removeItem('jwt');
    this._connectedUser.next(null);
  }


}
