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
  readonly _listLateness: BehaviorSubject<Lateness[]> = new BehaviorSubject<Lateness[]>([])

  refresh() {
    this.http
      .get<Lateness[]>("http://localhost:8080/lateness/list")
      .subscribe((invalidLateness: Lateness[]) => {
        let filteredLateness = invalidLateness.filter(lateness => lateness.validity === null);
        this._invalidLateness.next(filteredLateness);
      });
  }


  getListLateness() {
      this.http
        .get<Lateness[]>("http://localhost:8080/lateness/list")
        .subscribe((latenessList: Lateness[]) => {
          this._listLateness.next(latenessList);
        });

      return this._listLateness;
    }
}
