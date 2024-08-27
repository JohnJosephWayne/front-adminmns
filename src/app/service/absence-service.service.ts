import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Absence } from "../model/absence";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  http = inject(HttpClient);

  private readonly baseUrl = "http://localhost:8080/absence";
  private readonly userUrl = "http://localhost:8080/absence/student";

  _invalidAbsences = new BehaviorSubject<Absence[]>([]);
  _listAbsences = new BehaviorSubject<Absence[]>([]);
  _listFilteredbyId = new BehaviorSubject<Absence[]>([]);
  _listbyId = new BehaviorSubject<Absence[]>([]);


  refresh(): void {
    this.http.get<Absence[]>(`${this.baseUrl}/list`)
      .pipe(
        tap(invalidAbsences => {
          const filteredAbsences = invalidAbsences.filter(absence => absence.validity === null);
          this._invalidAbsences.next(filteredAbsences);
        })
      ).subscribe();
  }

  getListAbsences(): Observable<Absence[]> {
    this.http.get<Absence[]>(`${this.baseUrl}/list`)
      .pipe(
        tap(absenceList => this._listAbsences.next(absenceList))
      ).subscribe();
    return this._listAbsences.asObservable();
  }

  getListFilteredAbsencesById(id: number | undefined) {
    this.http.get<Absence[]>(`${this.userUrl}/${id}`)

      .pipe(
        tap(filteredAbsences => {
          const filteredAbsenceById = filteredAbsences.filter(absence => absence.validity === null || absence.validity === false);
          this._listFilteredbyId.next(filteredAbsenceById);
        })
      ).subscribe();
    return this._listFilteredbyId.asObservable();

  }

  getListAbsencesById(id: number | undefined): Observable<Absence[]> {
    this.http.get<Absence[]>(`${this.userUrl}/${id}`)
      .pipe(
        tap(absencesList => this._listbyId.next(absencesList))
      ).subscribe();
    return this._listFilteredbyId.asObservable();
  }

  deleteAbsence(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        tap(() => {
          const updatedList = this._listAbsences.value.filter(absence => absence.id !== id);
          this._listAbsences.next(updatedList);
        })
      );
  }
}
