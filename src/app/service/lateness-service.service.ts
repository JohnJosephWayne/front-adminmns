import {inject, Injectable} from '@angular/core';
import {Lateness} from "../model/lateness";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LatenessServiceService {

  http: HttpClient = inject(HttpClient);

  readonly _invalidLateness: BehaviorSubject<Lateness[]> = new BehaviorSubject<Lateness[]>([])

  refresh() {
    this.http
      .get<any[]>("http://localhost:8080/lateness/list")
      .subscribe((invalidLateness: Lateness[]) => {
        invalidLateness.forEach((lateness) => {
          if (lateness.validity === null) {
            this._invalidLateness.value.push(lateness);
            this._invalidLateness.next(this._invalidLateness.value);
          }
        });
      });
  }
}
