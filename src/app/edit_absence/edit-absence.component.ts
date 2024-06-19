import {Component, inject, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AbsenceServiceService} from "../service/absence-service.service";
import {Absence} from "../model/absence";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";

@Component({
  selector: 'app-edit-absence',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatRadioButton,
    MatRadioGroup,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatDatepicker,
    MatDatepickerToggle
  ],
  templateUrl: './edit-absence.component.html',
  styleUrl: './edit-absence.component.scss'
})

export class EditAbsenceComponent implements OnInit {
  absenceService: AbsenceServiceService = inject(AbsenceServiceService);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  formBuilder: FormBuilder = inject(FormBuilder);
  idAbsence: number | null = null;
  listAbsences: Absence[] = [];
  absence: Absence | undefined;

  formulaireEditAbsence: FormGroup = this.formBuilder.group(
    {
      email: ["", [Validators.required, Validators.email]],
      lastname: ["", [Validators.required]],
      firstname: ["", [Validators.required]],
      creationDate: ["", [Validators.required]],
      start: ["", [Validators.required]],
      end: ["", [Validators.required]],
      status: ["", [Validators.required]]
    }
  )

  ngOnInit() {

    this.route.params.subscribe(parameter => {
      this.idAbsence = parameter['id'];
      if (this.idAbsence != null && !isNaN(this.idAbsence)) {
        this.http.get("http://localhost:8080/absence/" + this.idAbsence)
          .subscribe({
            next: (user) => this.formulaireEditAbsence.patchValue(user),
            error: (error) => {
              if (error.status == 404) {
                alert("L'absence n'existe pas");
              }
            }
          })
      }
    })

    this.absenceService.getListAbsence().subscribe(absences => {
      console.log('Absences:', absences);  // Vérification des données récupérées
      this.listAbsences = absences;
      console.log(this.listAbsences);  // Vérification des données après mise à jour du tableau
    });
  }

  onSubmit() {
    if (this.formulaireEditAbsence.valid) {

      console.log(this.formulaireEditAbsence.value)
      console.log(this.idAbsence)

      if (this.idAbsence) {
        this.http
          .put("http://localhost:8080/absence/" + this.idAbsence, this.formulaireEditAbsence.value)
          .subscribe(result => {
            if (this.absence?.validity == null) {
              this.absence?.validity == ('treated')
              this.absence?.validity == true;
            } else {
              this.absence.validity == false;
            }
            this.router.navigateByUrl("/accueil")
          });
      } else {
        this.http.post("http://localhost:8080/absence", this.formulaireEditAbsence.value)
          .subscribe(result =>
            this.router.navigateByUrl("/accueil"));
      }
    }
  }
  comparateurEtat(a: any, b: any) {

    return a != null && b != null && a.id == b.id;
  }
}
