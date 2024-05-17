import {Component, inject, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthentificationService } from "../authentification.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDivider} from "@angular/material/divider";
import {LatenessServiceService} from "../service/lateness-service.service";
import {AbsenceServiceService} from "../service/absence-service.service";
import {StudentFolderServiceService} from "../service/student-folder-service.service";

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
  absenceService: AbsenceServiceService = inject(AbsenceServiceService);
  studentFolderService : StudentFolderServiceService = inject(StudentFolderServiceService);
  authentification: AuthentificationService = inject(AuthentificationService)

  user: any;
  invalidFolders: any[] = [];
  nbToTreatFolder: number = 0;
  invalidAbsences: any[] = [];
  nbToTreatAbsences: number = 0;
  invalidLateness: any[] = [];
  nbToTreatLateness: number = 0;
  absenceList: any[] = [];
  folderList: any[] = [];
  latenessList: any[] = [];

  ngOnInit(): void {
    this.http
      .get("http://localhost:8080/user-by-email/" + this.authentification.user.sub)
      .subscribe((user: any) => {
        this.user = user;
      });

    this.latenessService._invalidLateness.subscribe(
      invalidLateness => this.invalidLateness = invalidLateness)
    this.latenessService.refresh()

    this.latenessService._listLateness.subscribe((
      latenessList => this.latenessList = latenessList));
    this.latenessService.getListLateness()

    this.absenceService._invalidAbsences.subscribe(
      invalidAbsences => this.invalidAbsences = invalidAbsences)
    this.absenceService.refresh()

    this.absenceService._listAbsences.subscribe((
      absenceList => this.absenceList = absenceList));
    this.absenceService.getListAbsence()

    this.studentFolderService._studentFolder.subscribe(
      invalidFolder => this.invalidFolders = invalidFolder)
    this.studentFolderService.refresh()

    this.studentFolderService._listFolder.subscribe((
      folderList => this.folderList = folderList));
    this.studentFolderService.getListFolder();
  }
}
