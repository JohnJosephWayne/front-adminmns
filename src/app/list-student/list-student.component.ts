import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";

import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-list-student',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule
  ],
  templateUrl: './list-student.component.html',
  styleUrl: './list-student.component.scss'
})
export class ListStudentComponent {

  listStudent: any[] = [];
  dataSource = new MatTableDataSource(this.listStudent);
  http: HttpClient = inject(HttpClient);
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'boutons'];


  ngOnInit(): void {
    this.http
      .get<any[]>("http://localhost:8080/student/list")
      .subscribe(listStudent => {
        this.listStudent = listStudent;
        this.dataSource = new MatTableDataSource(this.listStudent);
console.log(listStudent)
        console.log(this.listStudent)
      });
  }

  onDeleteUser(idStudent: number) {
    this.http
      .delete("http://localhost:8080/student/" + idStudent)
      .subscribe(result => console.log(result))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
