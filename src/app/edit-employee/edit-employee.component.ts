import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatRadioButton,
    MatRadioGroup,
    MatSuffix,
    ReactiveFormsModule,
    MatButton,
    MatSelect,
    MatOption
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  formBuilder: FormBuilder = inject(FormBuilder);
  erreurConnexion: boolean = false;
  idEmployee: number | null = null;
  afficheMotDePasse = false;
  rolList: any[] = [];
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  formulaireEditEmployee: FormGroup = this.formBuilder.group(
    {
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(this.passwordRegex)]],
      lastname: ["", [Validators.required]],
      firstname: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      department: ['', [Validators.required]],
      role: [null, [Validators.required]],
    }
  )

  ngOnInit() {

    this.route.params.subscribe(parameter => {
      this.idEmployee = parameter['id'];
      if (this.idEmployee != null && !isNaN(this.idEmployee)) {
        this.http.get("http://localhost:8080/employee/" + this.idEmployee)
          .subscribe({
            next: (employee) => this.formulaireEditEmployee.patchValue(employee),
            error: (error) => {
              if (error.status == 404) {
                alert("L'employé n'existe pas");
              }
            }
          })
      }
    })

    this.http
      .get<any []>("http://localhost:8080/role/list")
      .subscribe(result => this.rolList = result);
  }

  onSubmit() {
    if (this.formulaireEditEmployee.valid) {

      console.log(this.formulaireEditEmployee.value)
      console.log(this.idEmployee)

      if (this.idEmployee) {

        const utilisateur = {...this.formulaireEditEmployee.value, password : "ToChangePassword2?"}

        this.http.put("http://localhost:8080/employee/" + this.idEmployee, utilisateur)
          .subscribe(result => this.router.navigateByUrl("/list-employee"));

      } else {
        this.http.post("http://localhost:8080/employee", this.formulaireEditEmployee.value)
          .subscribe(result => this.router.navigateByUrl("/list-employee"));
      }
    }
  }

  comparateurEtat(a: any, b: any) {

    return a != null && b != null && a.roleId == b.roleId;
  }

}
