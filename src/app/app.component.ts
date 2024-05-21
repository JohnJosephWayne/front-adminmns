import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {AuthentificationService} from "./authentification.service";
import {AccueilComponent} from "./accueil/accueil.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    ConnexionComponent,
    InscriptionComponent,
    AccueilComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard admin_Mns';

  authentication: AuthentificationService = inject(AuthentificationService)

  ngOnInit(){
    this.authentication.authentificationAvecJwtLocalStorage()

  }
}
