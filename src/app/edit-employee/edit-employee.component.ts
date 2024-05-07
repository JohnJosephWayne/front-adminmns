import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

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
    MatButton
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
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  formulaireEditEmployee: FormGroup = this.formBuilder.group(
    {
      email: ["", [Validators.required, Validators.email]],
      password: ["ToChangePassword123!", [Validators.required, Validators.pattern(this.passwordRegex)]],
      lastname: ["", [Validators.required]],
      firstname: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      department: ['', [Validators.required]],
      role: ['', [Validators.required]],
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
  }

  onSubmit() {
    if (this.formulaireEditEmployee.valid) {

      console.log(this.formulaireEditEmployee.value)
      console.log(this.idEmployee)

      if (this.idEmployee) {
        this.http.put("http://localhost:8080/employee/" + this.idEmployee, this.formulaireEditEmployee.value)
          .subscribe(result => this.router.navigateByUrl("/list-employee"));
      } else {
        this.http.post("http://localhost:8080/employee", this.formulaireEditEmployee.value)
          .subscribe(result => this.router.navigateByUrl("/list-employee"));
      }
    }
  }

  comparateurEtat(a: any, b: any) {

    return a != null && b != null && a.id == b.id;
  }

}
