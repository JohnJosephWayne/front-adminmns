import {Component, inject} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatAnchor, MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {RouterLink} from "@angular/router";
import {LatenessService} from "../service/lateness-service.service";
import {Lateness} from "../model/lateness";
@Component({
  selector: 'app-list-lateness',
  standalone: true,
    imports: [
        DatePipe,
        MatAnchor,
        MatButton,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        RouterLink
    ],
  templateUrl: './validation-retard.component.html',
  styleUrl: './validation-retard.component.scss'
})
export class ValidationRetardComponent {

  latenessService: LatenessService = inject(LatenessService)
  listLateness: Lateness[] = [];
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'email', 'creationDate', 'start', 'statut', 'boutons'];
  dataSource = new MatTableDataSource<Lateness>(this.listLateness);

  ngOnInit(): void {
    this.latenessService.getListLateness().subscribe(lateness => {
      this.listLateness = lateness;
      this.dataSource.data = this.listLateness;
      console.log('Lateness:', this.listLateness);
    });
  }

  onDeleteLateness(id: number): void {
    this.latenessService.deleteLateness(id).subscribe(result => {
      console.log(result);
      this.listLateness = this.listLateness.filter(lateness => lateness.id !== id);
      this.dataSource.data = this.listLateness;
    });
  }
}
