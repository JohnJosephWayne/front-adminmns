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
import {MatButtonToggle} from "@angular/material/button-toggle";
import {AuthentificationService} from "../authentification.service";
import {User} from "../model/user";

/**
 * Component for user login.
 *
 * This component provides a user interface for users to log in to the application.
 * It uses Angular Reactive Forms to manage the login form and user authentication.
 *
 * ### Features:
 * - Displays a form with fields for email and password.
 * - Validates the form inputs before submitting the data to the server.
 * - Sends an HTTP POST request to the `/connexion` endpoint to receive a JWT token.
 * - Stores the JWT token in the browser's localStorage.
 * - Redirects the user to the home page after successful login.
 * - Displays an error message in case of a failed login.
 *
 * ### Dependencies:
 * - Uses Angular Material for UI components.
 * - Uses the HttpClient module for HTTP requests.
 * - Uses the `AuthentificationService` service to obtain information about the logged-in user.
 *
 * ### Usage:
 * Ensure that the `AuthentificationService` is properly configured and that the `/connexion`
 * endpoint is operational on the backend server.
 */

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
    MatButtonToggle,
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})
export class ConnexionComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  authentication: AuthentificationService = inject(AuthentificationService)


  formulaireConnexion: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  erreurConnexion: boolean = false;
  afficheMotDePasse = false;

  user?: User;

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
            this.authentication.getConnectedUser().then();
            this.router.navigateByUrl('/accueil');
          },
          error: (reponse) => {
            this.erreurConnexion = true;
            console.log(reponse);
          },
        });
    }
  }
}
