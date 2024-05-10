import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTableModule
} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatAnchor, MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-employee',
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
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss'
})
export class ListEmployeeComponent {
  listEmployee: any[] = [];
  http: HttpClient = inject(HttpClient);
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'department', 'role', 'boutons'];

  ngOnInit(): void {
    this.http
      .get<any[]>("http://localhost:8080/employee/list")
      .subscribe(listEmployee => {
        this.listEmployee = listEmployee;
      });
  }

  onDeleteEmployee(idEmployee: number) {
    this.http
      .delete("http://localhost:8080/employee/" + idEmployee)
      .subscribe(result => console.log(result))
  }

}
