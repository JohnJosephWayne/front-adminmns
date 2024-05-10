import {Component, inject, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthentificationService } from "../authentification.service";
import { Folder } from "../model/folder";
import { Absence } from "../model/absence";
import { Lateness } from "../model/lateness";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDivider} from "@angular/material/divider";
import {LatenessServiceService} from "../service/lateness-service.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatDivider
  ],
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  latenessService: LatenessServiceService = inject(LatenessServiceService);
  authentification: AuthentificationService = inject(AuthentificationService)

  user: any;
  invalidFolders: any[] = [];
  nbToTreatFolder: number = 0;
  invalidAbsences: any[] = [];
  nbToTreatAbsences: number = 0;
  invalidLateness: any[] = [];
  nbToTreatLateness: number = 0;

  ngOnInit(): void {
    this.http
      .get("http://localhost:8080/user-by-email/" + this.authentification.user.sub)
      .subscribe((user: any) => {
        this.user = user;
      });

    this.latenessService._invalidLateness.subscribe(
      invalidLateness => this.invalidLateness = invalidLateness)

    this.latenessService.refresh()

    this.http
      .get<any[]>("http://localhost:8080/absence/list")
      .subscribe((invalidAbsences: Absence[]) => {
        invalidAbsences.forEach((absence) => {
          if (absence.validity === null) {
            this.invalidAbsences.push(absence);
          }
        });
        this.nbToTreatAbsences = this.invalidAbsences.length;
      });

    this.http
      .get<any[]>("http://localhost:8080/student-inscription-folder/list")
      .subscribe((invalidFolders: Folder[]) => {
        invalidFolders.forEach((folder) => {
          if (folder.validity === null) {
            this.invalidFolders.push(folder);
          }
        });
        this.nbToTreatFolder = this.invalidFolders.length;
      });
  }
}
