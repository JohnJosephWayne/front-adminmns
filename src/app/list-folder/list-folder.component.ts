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
import { Folder } from "../model/folder";
import { FolderServiceService } from "../service/folder-service.service";
import {DatePipe} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-list-folder',
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
    MatPaginator
  ],
  templateUrl: 'list-folder.component.html',
  styleUrls: ['list-folder.component.scss']
})
export class ListFolderComponent implements OnInit {

  folderService = inject(FolderServiceService);
  http = inject(HttpClient);
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'email', 'validity', 'documentList', 'boutons'];
  listFolders: Folder[] = [];
  dataSource = new MatTableDataSource<Folder>(this.listFolders);

  ngOnInit(): void {
    this.folderService.getListFolder().subscribe(folders => {
      console.log('Folders:', folders);  // Vérification des données récupérées
      this.listFolders = folders;
      this.dataSource.data = this.listFolders;
      console.log(this.listFolders);  // Vérification des données après mise à jour du tableau
    });
  }

  onDeleteFolder(id: number): void {
    this.http.delete("http://localhost:8080/student-inscription-folder/" + id)
      .subscribe(result => {
        console.log(result);
        // Mise à jour de la liste des folders après suppression
        this.listFolders = this.listFolders.filter(folder => folder.id !== id);
        this.dataSource.data = this.listFolders;
      });
  }
}
