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
import {LatenessService} from "../service/lateness-service.service";
import {Lateness} from "../model/lateness";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";

@Component({
  selector: 'app-edit-lateness',
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
  templateUrl: './edit-lateness.component.html',
  styleUrl: './edit-lateness.component.scss'
})

export class EditLatenessComponent implements OnInit {
  latenessService: LatenessService = inject(LatenessService);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  formBuilder: FormBuilder = inject(FormBuilder);
  idLateness: number | null = null;
  listLateness: Lateness[] = [];
  lateness: Lateness | undefined;

  formulaireEditLateness: FormGroup = this.formBuilder.group(
    {
      email: ["", [Validators.required, Validators.email]],
      lastname: ["", [Validators.required]],
      firstname: ["", [Validators.required]],
      creationDate: ["", [Validators.required]],
      date: ["", [Validators.required]],
      validity: ["", [Validators.required]]
    }
  )

  ngOnInit() {

    this.route.params.subscribe(parameter => {
      this.idLateness = parameter['id'];
      if (this.idLateness != null && !isNaN(this.idLateness)) {
        this.http.get("http://localhost:8080/lateness/" + this.idLateness)
          .subscribe({
            next: (user) => this.formulaireEditLateness.patchValue(user),
            error: (error) => {
              if (error.status == 404) {
                alert("Lateness n'existe pas");
              }
            }
          })
      }
    })

    this.latenessService.getListLateness().subscribe(lateness => {
      console.log('Lateness:', lateness);  // Vérification des données récupérées
      this.listLateness = lateness;
      console.log(this.listLateness);  // Vérification des données après mise à jour du tableau
    });
  }

  onSubmit() {
    if (this.formulaireEditLateness.valid) {

      console.log(this.formulaireEditLateness.value)
      console.log(this.idLateness)

      if (this.idLateness) {
        this.http
          .put("http://localhost:8080/lateness/" + this.idLateness, this.formulaireEditLateness.value)
          .subscribe(result => {
            if (this.lateness?.validity == null) {
              this.lateness?.validity == ('treated')
              this.lateness?.validity == true;
            } else {
              this.lateness.validity == false;
            }
            this.router.navigateByUrl("/accueil")
          });
      } else {
        this.http.post("http://localhost:8080/lateness", this.formulaireEditLateness.value)
          .subscribe(result =>
            this.router.navigateByUrl("/accueil"));
      }
    }
  }
}
