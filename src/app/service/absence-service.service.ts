import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Absence} from "../model/absence";
import {User} from "../model/user";



@Injectable({
  providedIn: 'root'
})
export class AbsenceServiceService {

  http: HttpClient = inject(HttpClient);

  readonly _invalidAbsences: BehaviorSubject<Absence[]> = new BehaviorSubject<Absence[]>([])
  readonly _listAbsences: BehaviorSubject<Absence[]> = new BehaviorSubject<Absence[]>([]);
  readonly _listFilteredbyId: BehaviorSubject<Absence[]> = new BehaviorSubject<Absence[]>([]);
  readonly _listbyId: BehaviorSubject<Absence[]> = new BehaviorSubject<Absence[]>([]);
  readonly _userInfo: User | undefined;


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
      })
    return this._listAbsences;
  }

  getListFilteredAbsencesbyId() {

    this.http
      .get<Absence[]>("http://localhost:8080/users/absences")
      .subscribe((filteredAbsences: Absence[]) => {
        console.log(filteredAbsences)

        let filteredAbsenceById = filteredAbsences.filter(absence => absence.validity === null);
        this._listFilteredbyId.next(filteredAbsenceById);
        console.log(filteredAbsences)
        console.log(this._listFilteredbyId)
      })
  }
  getListAbsenceById() {
    this.http
      .get<Absence[]>("http://localhost:8080/users/absences")
      .subscribe((absencesList: Absence[]) => {

        console.log(absencesList)
        this._listbyId.next(absencesList);
        console.log(this._listbyId)
      })
    return this._listbyId;
  }
}


