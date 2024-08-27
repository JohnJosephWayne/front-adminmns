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
import {AbsenceService} from "../service/absence-service.service";
import {Absence} from "../model/absence";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {userGuard} from "../user.guard";
import {AuthentificationService} from "../authentification.service";
import {AbsenceCause, AbsenceModel} from "../model/absenceModel";
import {User} from "../model/user";

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
  absenceService: AbsenceService = inject(AbsenceService);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  formBuilder: FormBuilder = inject(FormBuilder);
  idAbsence: number | null = null;
  listAbsences: Absence[] = [];
  absence: Absence | undefined;
  authentificationService: AuthentificationService = inject(AuthentificationService);
  userInfo : any;
  listAbsenceCause : AbsenceCause[] = [];

  formulaireEditAbsence: FormGroup = this.formBuilder.group(
    {
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      lastname: [{value: '', disabled: true}, [Validators.required]],
      firstname: [{value: '', disabled: true}, [Validators.required]],
      creationDate: [{value: '', disabled: true}, [Validators.required]],
      start: [{value: '', disabled: true}, [Validators.required]],
      end: [{value: '', disabled: true}, [Validators.required]],
      absenceCause: ["",[]],
      status: [{value: '', disabled: true}, [Validators.required]]
    });

  initForm():void  {
    this.authentificationService
      .getConnectedUser()
      .then(
        value => {
          if(value?.role?.name== 'ADMIN' || value?.role?.name== 'VALIDATOR'){
            this.formulaireEditAbsence = this.formBuilder.group(
              {
                email: ["", [Validators.required, Validators.email]],
                lastname: ["", [Validators.required]],
                firstname: ["", [Validators.required]],
                creationDate: ["", [Validators.required]],
                start: ["", [Validators.required]],
                end: ["", [Validators.required]],
                absenceCause: [[],[Validators.required]],
                status: ["true", [Validators.required]]
              }
            )
          }else if(value?.role?.name== 'STUDENT'){
            this.formulaireEditAbsence = this.formBuilder.group(
              {
                email: [{value: value.email, disabled: true}, [Validators.required, Validators.email]],
                lastname: [{value: value.lastname, disabled: true}, [Validators.required]],
                firstname: [{value: value.firstname, disabled: true}, [Validators.required]],
                creationDate: [{value: new Date(), disabled: true}, [Validators.required]],
                start: ["", [Validators.required]],
                end: ["", [Validators.required]],
                absenceCause: ["",[Validators.required]],
                status: [{value: null, disabled: true}, [Validators.required]]
              }
            )
          }
        })
    ;

  }

  ngOnInit() {
    this.initForm();
    this.authentificationService._connectedUser.subscribe(userInfo => {
      this.userInfo = userInfo;
    })

    this.route.params.subscribe(parameter => {
      this.idAbsence = parameter['id'];
      if (this.idAbsence != null && !isNaN(this.idAbsence)) {
        this.http.get("http://localhost:8080/absence/" + this.idAbsence)
          .subscribe({
            next: (absence) => this.formulaireEditAbsence.patchValue(this.flatAbsence({absence: absence})),
            error: (error) => {
              if (error.status == 404) {
                alert("L'absence n'existe pas");
              }
            }
          })
      }
    })

    this.http
      .get<any []>("http://localhost:8080/absence/causes")
      .subscribe(resultat => this.listAbsenceCause = resultat);
  }

  flatAbsence({absence}: { absence: any }){
    console.log("absence", absence)
    let flatAbsence = {
      email: absence.studentAbsence.email,
      lastname: absence.studentAbsence.lastname,
      firstname: absence.studentAbsence.firstname,
      creationDate: absence.creationDate,
      start: absence.start,
      end: absence.end,
      status: absence.validity,
      absenceCause: absence.absenceCause
    }
    console.log("flatabsence", flatAbsence)
    return flatAbsence;
  }
  onSubmit() {
    if (this.formulaireEditAbsence.valid) {

      let formRawValue = this.formulaireEditAbsence.getRawValue();
      let absenceModel : AbsenceModel = {
        id : this.idAbsence,
        validity: formRawValue.status,
        creationDate: formRawValue.creationDate,
        start: formRawValue.start,
        end: formRawValue.end,
        studentAbsence:{
          id : null,
          email : formRawValue.email,
          lastname : formRawValue.lastname,
          firstname : formRawValue.firstname,
        },
        absenceCause:{
          id : formRawValue.absenceCause.id,
          name : formRawValue.absenceCause.name
        }
      }

      if (this.idAbsence) {
        this.http
          .put("http://localhost:8080/absence/" + this.idAbsence, absenceModel)
          .subscribe(result =>
            this.router.navigateByUrl("/accueil"));
      } else {
        this.http.post("http://localhost:8080/absence", absenceModel)
          .subscribe(result =>
            this.router.navigateByUrl("/accueil"));
      }
    }
  }
  comparateurEtat(a: any, b: any) {

    return a != null && b != null && a.id == b.id;
  }

  protected readonly User = User;
}
