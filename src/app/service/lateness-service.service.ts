import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Lateness } from "../model/lateness";
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LatenessService {

  http = inject(HttpClient);

  private readonly baseUrl = "http://localhost:8080/lateness";
  private readonly userUrl = "http://localhost:8080/users/lateness";

  _invalidLateness = new BehaviorSubject<Lateness[]>([]);
  _listLateness = new BehaviorSubject<Lateness[]>([]);
  _listFilteredbyId = new BehaviorSubject<Lateness[]>([]);
  _listbyId = new BehaviorSubject<Lateness[]>([]);


  refresh(): void {
    this.http.get<Lateness[]>(`${this.baseUrl}/list`)
      .pipe(
        tap(invalidLateness => {
          const filteredLateness = invalidLateness.filter(lateness => lateness.validity === null || lateness.validity === false);
          this._invalidLateness.next(filteredLateness);
        })
      ).subscribe();
  }

  getListLateness(): Observable<Lateness[]> {
    this.http.get<Lateness[]>(`${this.baseUrl}/list`)
      .pipe(
        tap(latenessList => this._listLateness.next(latenessList))
      ).subscribe();
    return this._listLateness.asObservable();
  }

  getListFilteredLatenessById(): void {
    this.http.get<Lateness[]>(this.userUrl)
      .pipe(
        tap(filteredLateness => {
          const filteredLatenessById = filteredLateness.filter(lateness => lateness.validity === null || lateness.validity === false);
          this._listFilteredbyId.next(filteredLatenessById);
        })
      ).subscribe();
  }

  getListLatenessById(): Observable<Lateness[]> {
    this.http.get<Lateness[]>(this.userUrl)
      .pipe(
        tap(latenessList => this._listbyId.next(latenessList))
      ).subscribe();
    return this._listbyId.asObservable();
  }

  deleteLateness(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        tap(() => {
          const updatedList = this._listLateness.value.filter(lateness => lateness.id !== id);
          this._listLateness.next(updatedList);
        })
      );
  }
}
