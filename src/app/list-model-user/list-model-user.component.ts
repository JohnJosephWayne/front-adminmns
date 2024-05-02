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

@Component({
  selector: 'app-list-model-user',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule
  ],
  templateUrl: './list-model-user.component.html',
  styleUrl: './list-model-user.component.scss'
})
export class ListModelUserComponent {

  listUser: any[] = [];
  dataSource = new MatTableDataSource(this.listUser);
  http: HttpClient = inject(HttpClient);
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'role', 'boutons'];


  ngOnInit(): void {
    this.http
      .get<any[]>("http://localhost:8080/users/list")
      .subscribe(listUser => {
        this.listUser = listUser;
        this.dataSource = new MatTableDataSource(this.listUser);

      });
  }

  onDeleteUser(idUser: number) {
    this.http
      .delete("http://localhost:8080/users/" + idUser)
      .subscribe(result => console.log(result))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
