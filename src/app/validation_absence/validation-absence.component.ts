import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatError, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { Absence } from "../model/absence";
import { AbsenceServiceService } from "../service/absence-service.service";
import {DatePipe} from "@angular/common";
import {MatSort} from "@angular/material/sort";

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
    RouterLink,
    DatePipe,
    MatSort
  ],
  templateUrl: 'validation-absence.component.html',
  styleUrls: ['validation-absence.component.scss']
})
export class ValidationAbsenceComponent implements OnInit {

  absenceService = inject(AbsenceServiceService);
  http = inject(HttpClient);
  displayedColumns: string[] = ['lastname', 'firstname', 'start', 'end', 'creationDate', 'statut', 'cause', 'boutons'];
  listAbsences: Absence[] = [];
  dataSource = new MatTableDataSource<Absence>(this.listAbsences);

  ngOnInit(): void {
    this.absenceService.getListAbsence().subscribe(absences => {
      console.log('Absences:', absences);  // Vérification des données récupérées
      this.listAbsences = absences;
      this.dataSource.data = this.listAbsences;
      console.log(this.listAbsences);  // Vérification des données après mise à jour du tableau
    });
  }

  onDeleteAbsence(id: number): void {
    this.http.delete("http://localhost:8080/absence/" + id)
      .subscribe(result => {
        console.log(result);
        // Mise à jour de la liste des absences après suppression
        this.listAbsences = this.listAbsences.filter(absence => absence.id !== id);
        this.dataSource.data = this.listAbsences;
      });
  }
}
