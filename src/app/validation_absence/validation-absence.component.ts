import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTableModule
} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatAnchor, MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AbsenceServiceService} from "../service/absence-service.service";
import {BehaviorSubject} from "rxjs";
import {Absence} from "../model/absence";
import {AuthentificationService} from "../authentification.service";

@Component({
  selector: 'app-list-absence',
  standalone: true,
  imports: [
    FormsModule,
    MatError,
    MatFormFieldModule,
    MatInput,
    MatLabel,
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    MatButtonModule,
    MatAnchor,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTableModule,
    RouterLink
  ],
  templateUrl: 'validation-absence.component.html',
  styleUrl: 'validation-absence.component.scss'
})

export class ValidationAbsenceComponent implements OnInit {

  authentification = inject(AuthentificationService);
  userInfo: any;
  absenceService: AbsenceServiceService = inject(AbsenceServiceService);
  http: HttpClient = inject(HttpClient);
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'email', 'statut' , 'boutons'];
  listAbsence: BehaviorSubject<Absence[]> | undefined;


  ngOnInit(): void {

    this.authentification._connectedUser.subscribe(userInfo => {
      this.userInfo = userInfo;
    })
    if (this.listAbsence !=  undefined) {
      this.listAbsence = this.absenceService.getListAbsence();
    }
  }

    onDeleteAbsence(id: number) {
      this.http
        .delete("http://localhost:8080/absence/" + id)
        .subscribe(result => console.log(result))
    }

}
