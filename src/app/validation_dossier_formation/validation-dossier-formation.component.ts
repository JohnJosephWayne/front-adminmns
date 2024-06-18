import {Component, inject} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
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
import {Folder} from "../model/folder";
import {StudentFolderService} from "../service/student-folder-service.service";

@Component({
  selector: 'app-validation-dossier-formation',
  standalone: true,
    imports: [
        MatButton,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatError,
        MatFormField,
        MatHint,
        MatInput,
        MatLabel,
        MatSuffix,
        MatToolbar,
        ReactiveFormsModule,
        DatePipe,
        MatAnchor,
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
  templateUrl: './validation-dossier-formation.component.html',
  styleUrl: './validation-dossier-formation.component.scss'
})
export class ValidationDossierFormationComponent {

  studentFolderService: StudentFolderService = inject(StudentFolderService)
  listFolders: Folder[] = [];
  message: string = '';
  dataSource = new MatTableDataSource<Folder>(this.listFolders);



  ngOnInit(): void {
    this.studentFolderService.getListFolders().subscribe(folders => {
      this.listFolders = folders;
      this.dataSource.data = this.listFolders;
      console.log('Folders:', this.listFolders);
    });
  }

  onDeleteFolder(id: number): void {
    this.studentFolderService.deleteFolder(id).subscribe(result => {
      console.log(result);
      this.listFolders = this.listFolders.filter(folder => folder.id !== id);
      this.dataSource.data = this.listFolders;
      this.message = 'Folder deleted successfully!';
    });
  }
}


