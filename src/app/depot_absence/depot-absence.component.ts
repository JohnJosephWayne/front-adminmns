import {Component, inject} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../model/user";
import {MatIcon} from "@angular/material/icon";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {FileUploadService} from "../service/file-upload.service";

@Component({
  selector: 'app-depot-absence',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatHint,
    MatSuffix,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatList,
    MatListItem
  ],
  templateUrl: './depot-absence.component.html',
  styleUrl: './depot-absence.component.scss'
})
export class DepotAbsenceComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  idStudent: number | null = null;


  formAbsence: FormGroup = this.formBuilder.group({
    cause: ['', [Validators.required]],
    pickerStart: ['', [Validators.required]],
    pickerEnd: ['', [Validators.required]],

  });

  user?: User;

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.progress = 0;
    this.message = "";

    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
        },
        complete: () => {
          this.currentFile = undefined;
        }
      });
    }
  }

  onSubmit() {
    this.route.params.subscribe(parameter => {
      this.idStudent = parameter['id'];
      if (this.idStudent != null && !isNaN(this.idStudent)) {
      }
      if (this.formAbsence.valid) {

        if (this.idStudent) {
          this.http.put("http://localhost:8080/absence/" + this.idStudent, this.formAbsence.value)
            .subscribe(result => this.router.navigateByUrl("/accueil"));
        } else {
          this.http.post("http://localhost:8080/absence", this.formAbsence.value)
            .subscribe(result => this.router.navigateByUrl("/depot/absence"));
        }
      }
    });
  }
}
