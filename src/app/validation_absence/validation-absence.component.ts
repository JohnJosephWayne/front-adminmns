import { Component, inject, OnInit } from '@angular/core';
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
import {DatePipe} from "@angular/common";
import {AbsenceService} from "../service/absence-service.service";

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
    DatePipe
  ],
  templateUrl: 'validation-absence.component.html',
  styleUrls: ['validation-absence.component.scss']
})
export class ValidationAbsenceComponent implements OnInit {
  absenceService = inject(AbsenceService)
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'email', 'statut', 'justification', 'boutons'];
  listAbsences: Absence[] = [];
  dataSource = new MatTableDataSource<Absence>(this.listAbsences);


  ngOnInit(): void {
    this.absenceService.getListAbsences().subscribe(
      (absences: Absence[]) => {
      this.listAbsences = absences;
      this.dataSource.data = this.listAbsences;
    });
  }

  onDeleteAbsence(id: number): void {
    this.absenceService.deleteAbsence(id).subscribe(
      (result: any) => {
      console.log(result);
      this.listAbsences = this.listAbsences.filter(absence => absence.id !== id);
      this.dataSource.data = this.listAbsences;
    });
  }
}
