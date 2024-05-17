import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Absence} from "../model/absence";


@Injectable({
  providedIn: 'root'
})
export class AbsenceServiceService {

  http: HttpClient = inject(HttpClient);

  readonly _invalidAbsences: BehaviorSubject<Absence[]> = new BehaviorSubject<Absence[]>([])
  readonly _listAbsences: BehaviorSubject<Absence[]> = new BehaviorSubject<Absence[]>([]);


  refresh() {
    this.http
      .get<Absence[]>("http://localhost:8080/absence/list")
      .subscribe((invalidAbsence: Absence[]) => {
        let filteredAbsence = invalidAbsence.filter(absence => absence.validity === null);
        this._invalidAbsences.next(filteredAbsence);
      });
  }

  getListAbsence() {
    this.http
      .get<Absence[]>("http://localhost:8080/absence/list")
      .subscribe((absenceList: Absence[]) => {
        this._listAbsences.next(absenceList);
      });
  }
}


