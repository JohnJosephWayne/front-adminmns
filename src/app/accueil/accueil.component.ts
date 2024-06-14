import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthentificationService} from "../authentification.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDivider} from "@angular/material/divider";
import {LatenessServiceService} from "../service/lateness-service.service";
import {AbsenceServiceService} from "../service/absence-service.service";
import {StudentFolderServiceService} from "../service/student-folder-service.service";
import {User} from "../model/user";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

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
  studentFolderService: StudentFolderServiceService = inject(StudentFolderServiceService);
  authentification: AuthentificationService = inject(AuthentificationService)

  userInfo: any
  invalidFolders: any[] = [];
  nbToTreatFolder: number = 0;
  invalidAbsences: any[] = [];
  nbToTreatAbsences: number = 0;
  invalidLateness: any[] = [];
  nbToTreatLateness: number = 0;
  absenceList: any[] = [];
  folderList: any[] = [];
  latenessList: any[] = [];
  filteredAbsenceById: any[] = []
  listbyId: any[] = []

  ngOnInit(): void {

    this.authentification._connectedUser.subscribe(userInfo => {
      this.userInfo = userInfo;
      console.log(userInfo);

      if (this.userInfo) {

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
    })

    this.authentification._connectedUser.subscribe(userInfo => {
      this.userInfo = userInfo;

        this.absenceService._listFilteredbyId.subscribe((
          filteredAbsencesById => this.filteredAbsenceById = filteredAbsencesById));

        this.absenceService.getListFilteredAbsencesbyId();


      this.absenceService._listbyId.subscribe((
        allAbsencesById => this.listbyId = allAbsencesById));
      this.absenceService.getListAbsence()
    })
  }
}
