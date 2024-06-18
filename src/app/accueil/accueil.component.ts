import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthentificationService} from "../authentification.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDivider} from "@angular/material/divider";
import {LatenessService} from "../service/lateness-service.service";
import {AbsenceService} from "../service/absence-service.service";
import {StudentFolderService} from "../service/student-folder-service.service";

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
  latenessService: LatenessService = inject(LatenessService);
  absenceService: AbsenceService = inject(AbsenceService);
  studentFolderService: StudentFolderService = inject(StudentFolderService);
  authentification: AuthentificationService = inject(AuthentificationService)

  userInfo: any
  invalidFolders: any[] = [];
  nbToTreatFolders: number = 0;
  invalidAbsences: any[] = [];
  nbToTreatAbsences: number = 0;
  invalidLateness: any[] = [];
  nbToTreatLateness: number = 0;
  absencesList: any[] = [];
  foldersList: any[] = [];
  latenessList: any[] = [];
  filteredAbsencesById: any[] = [];
  absencesListById: any[] = [];
  filteredLatenessById: any[] = [];
  latenessListById: any[] = [];
  filteredFoldersById: any[] = [];
  foldersListById: any[] = [];

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
          absencesList => this.absencesList = absencesList));
        this.absenceService.getListAbsences()

        this.studentFolderService._studentFolders.subscribe(
          invalidFolders => this.invalidFolders = invalidFolders)
        this.studentFolderService.refresh()

        this.studentFolderService._listFolders.subscribe((
          foldersList => this.foldersList = foldersList));
        this.studentFolderService.getListFolders();
      }
    })

    this.authentification._connectedUser.subscribe(userInfo => {
      this.userInfo = userInfo;

      this.absenceService._listFilteredbyId.subscribe((
        filteredAbsencesById => this.filteredAbsencesById = filteredAbsencesById));
      this.absenceService.getListFilteredAbsencesById();

      this.absenceService._listbyId.subscribe((
        allAbsencesById => this.absencesListById = allAbsencesById));
      this.absenceService.getListAbsencesById();

      this.latenessService._listFilteredbyId.subscribe((
        filteredLatenessById => this.filteredLatenessById = filteredLatenessById));
      this.latenessService.getListFilteredLatenessById();

      this.latenessService._listbyId.subscribe((
        allLatenessById => this.latenessListById = allLatenessById));
      this.latenessService.getListLatenessById();

      this.studentFolderService._listFilteredbyId.subscribe((
        filteredFoldersById => this.filteredFoldersById = filteredFoldersById));
      this.studentFolderService.getListFilteredFoldersById();

      this.studentFolderService._listbyId.subscribe((
        allFoldersById => this.foldersListById = allFoldersById));
      this.studentFolderService.getListFoldersById();

    })
  }
}
