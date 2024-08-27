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
import { Lateness } from "../model/lateness";
import {LatenessService} from "../service/lateness-service.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-list-lateness',
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
  templateUrl: 'validation-lateness.component.html',
  styleUrls: ['validation-lateness.component.scss']
})
export class ValidationLatenessComponent implements OnInit {

  latenessService = inject(LatenessService);
  http = inject(HttpClient);
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'email', 'statut', 'boutons'];
  listLateness: Lateness[] = [];
  dataSource = new MatTableDataSource<Lateness>(this.listLateness);

  ngOnInit(): void {
    this.latenessService.getListLateness().subscribe(lateness => {
      console.log('Latenesss:', lateness);  // Vérification des données récupérées
      this.listLateness = lateness;
      this.dataSource.data = this.listLateness;
      console.log(this.listLateness);  // Vérification des données après mise à jour du tableau
    });
  }

  onDeleteLateness(id: number): void {
    this.http.delete("http://localhost:8080/lateness/" + id)
      .subscribe(result => {
        console.log(result);
        // Mise à jour de la liste des latenesss après suppression
        this.listLateness = this.listLateness.filter(lateness => lateness.id !== id);
        this.dataSource.data = this.listLateness;
      });
  }
}
