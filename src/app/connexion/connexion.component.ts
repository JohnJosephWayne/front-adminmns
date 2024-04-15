import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})
export class ConnexionComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  formulaireConnexion: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  erreurConnexion: boolean = false;
  afficheMotDePasse = false;

  onConnexion() {

    if (this.formulaireConnexion.valid) {
      this.http
        .post<{ jwt: string }>(
          'http://localhost:8080/connexion',
          this.formulaireConnexion.value
        )
        .subscribe({
          next: (resultat) => {
            localStorage.setItem('jwt', resultat.jwt);
            this.router.navigateByUrl('/accueil');
            console.log(resultat);
          },
          error: (reponse) => {
            this.erreurConnexion = true;
            console.log(reponse);
          },
        });
    }
  }
}
