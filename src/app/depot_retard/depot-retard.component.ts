import { Component, inject } from '@angular/core';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { MatError, MatFormField, MatHint, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../model/user";
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardContent, MatCardHeader } from "@angular/material/card";
import { MatList, MatListItem } from "@angular/material/list";
import { MatToolbar } from "@angular/material/toolbar";
import { AsyncPipe } from "@angular/common";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-depot-lateness',
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
    MatListItem,
    MatToolbar,
    AsyncPipe,
    MatButton
  ],
  templateUrl: './depot-retard.component.html',
  styleUrls: ['./depot-retard.component.scss']
})
export class DepotLatenessComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  idStudent: number | null = null;

  formLateness: FormGroup = this.formBuilder.group({
    cause: ['', [Validators.required]],
    pickerDate: ['', [Validators.required]]
  });

  student?: User;

  constructor() {
    this.route.params.subscribe(params => {
      this.idStudent = +params['id'];
      if (this.idStudent) {
        this.fetchStudentData(this.idStudent);
      }
    });
  }

  fetchStudentData(id: number) {
    this.http.get<User>(`/list-student/${id}`).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (err) => {
        console.error('Failed to fetch student data', err);
      }
    });
  }

  onSubmit() {
    if (this.formLateness.valid) {
      const latenessData = {
        cause: this.formLateness.value.cause,
        date: this.formLateness.value.pickerDate,
        studentId: this.idStudent
      };

      this.http.post('/api/lateness', latenessData).subscribe({
        next: (response) => {
          console.log('Lateness reported successfully', response);
          this.router.navigate(['/success']);
        },
        error: (err) => {
          console.error('Failed to report lateness', err);
        }
      });
    }
  }
}
