import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatError, MatFormFieldModule, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatError,
    MatFormFieldModule,
    MatIconModule,
    MatIconButton,
    MatInput,
    MatLabel,
    MatRadioButton,
    MatRadioGroup,
    MatSuffix,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './edit_student.component.html',
  styleUrl: './edit_student.component.scss'
})
export class EditStudentComponent {

  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  formBuilder: FormBuilder = inject(FormBuilder);
  erreurConnexion: boolean = false;
  idStudent: number | null = null;
  afficheMotDePasse = false;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  formulaireEditStudent: FormGroup = this.formBuilder.group(
    {
      email: ["", [Validators.required, Validators.email]],
      password: ["ToChangePassword123!", [Validators.required, Validators.pattern(this.passwordRegex)]],
      lastname: ["", [Validators.required]],
      firstname: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      birthdate: ['', [Validators.required]],
      birthplace: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phoneNumber: ['', []],
      socialSecurityNumber: ['', []],
      franceTravailNumber: ['', []],
    }
  )


  ngOnInit() {

    this.route.params.subscribe(parameter => {
      this.idStudent = parameter['id'];
      if (this.idStudent != null && !isNaN(this.idStudent)) {
        this.http.get("http://localhost:8080/student/" + this.idStudent)
          .subscribe({
            next: (student) => this.formulaireEditStudent.patchValue(student),
            error: (error) => {
              if (error.status == 404) {
                alert("L'étudiant n'existe pas");
              }
            }
          })
      }
    })
  }

  onSubmit() {
    if (this.formulaireEditStudent.valid) {

      console.log(this.formulaireEditStudent.value)
      console.log(this.idStudent)

      if (this.idStudent) {
        this.http.put("http://localhost:8080/student/" + this.idStudent, this.formulaireEditStudent.value)
          .subscribe(result => this.router.navigateByUrl("/list-student"));
      } else {
        this.http.post("http://localhost:8080/student", this.formulaireEditStudent.value)
          .subscribe(result => this.router.navigateByUrl("/list-student"));
      }
    }
  }

  comparateurEtat(a: any, b: any) {

    return a != null && b != null && a.id == b.id;
  }

  // onEditUser(): void {
  //
  //   // test de la validité du formulaire
  //   if (this.formulaireEditUser.valid) {
  //     this.http
  //       .post('http://localhost:8080/inscription', this.formulaireEditUser.value)
  //       .subscribe({
  //         next: (result) => {
  //           //renvoi vers la page d'accueil après inscription
  //           this.router.navigateByUrl('/accueil');
  //           console.log(result);
  //         },
  //         error: (response) => {
  //           //renvoi de l'erreur
  //           this.erreurConnexion = true;
  //           console.log(response);
  //         },
  //       });
  //   }
  // }


}
