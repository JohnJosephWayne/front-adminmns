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
    MatOption
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
  idUser: number | null = null;
  listRole: any[] = [];
  afficheMotDePasse = false;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  formulaireEditUser: FormGroup = this.formBuilder.group(
    {
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required,Validators.pattern(this.passwordRegex)]],
      lastname: ["", [Validators.required]],
      firstname: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      role: [[], []],
    }
  )


  ngOnInit(){

    this.route.params.subscribe(parameter => {
      this.idUser = parameter['id'];
      if(this.idUser != null && !isNaN(this.idUser)){
        this.http.get("http://localhost:8080/users/" + this.idUser)
          .subscribe({
            next: (user) => this.formulaireEditUser.patchValue(user),
            error: (error) => {
              if(error.status == 404){
                alert("L'utilisateur n'existe pas");
              }
            }
          })
      }
    })

    this.http
      .get<any []>("http://localhost:8080/role/list")
      .subscribe(result => this.listRole = result);
  }

  onSubmit(){
    if(this.formulaireEditUser.valid){

      console.log(this.formulaireEditUser.value)
      console.log(this.idUser)

      if(this.idUser){
        this.http.put("http://localhost:8080/users/" + this.idUser, this.formulaireEditUser.value)
          .subscribe(result => this.router.navigateByUrl("/accueil"));
      }
      else {
        this.http.post("http://localhost:8080/users", this.formulaireEditUser.value)
          .subscribe(result => this.router.navigateByUrl("/accueil"));
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
