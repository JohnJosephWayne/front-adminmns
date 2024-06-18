import {Component, inject} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../model/user";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";


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
    MatListItem,
    MatToolbar,
    AsyncPipe,
    MatButton,
    MatSelect,
    MatOption
  ],
  templateUrl: './depot-formation.component.html',
  styleUrl: './depot-formation.component.scss'
})
export class DepotFormationComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  formFolder: FormGroup = this.formBuilder.group({
    training: ['', [Validators.required]],
    CV: ['', [Validators.required]],
    ARE:[''],
    secu: ['', [Validators.required]]
  });

  student?: User;

  @Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
  })
  currentFile?: File;
  message = '';

  fileName1 = 'Select File';
  fileName2 = 'Select File';
  fileName3 = 'Select File';

  trainingList: any = [];

  ngOnInit(): void {

    this.http
      .get('http://localhost:8080/training/list')
      .subscribe(trainingList => {
        this.trainingList = trainingList;

        return this.trainingList;
      })
  }

    selectFile(event: Event, type: string): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
      const file = input.files[0];
      switch (type) {
        case 'CV':
          this.fileName1 = file.name;
          break;
        case 'ARE':
          this.fileName2 = file.name;
          break;
        case 'secu':
          this.fileName3 = file.name;
          break;
      }
    }
  }

    onSubmit(): void {
      if (this.formFolder.valid) {

        this.http
          .post('http://localhost:8080/student-inscription-folder', this.formFolder.value)
          .subscribe((resultat) =>this.router.navigateByUrl("/accueil"))
        this.message = 'Form successfully submitted!';
    } else {
      this.message = 'Please fill in all required fields.';
    }
  }
}
