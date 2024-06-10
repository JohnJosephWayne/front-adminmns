import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {AuthentificationService} from "./authentification.service";
import {AccueilComponent} from "./accueil/accueil.component";
import {skip} from "rxjs";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    ConnexionComponent,
    InscriptionComponent,
    AccueilComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'dashboard admin_Mns';

  authentication: AuthentificationService = inject(AuthentificationService)

  ngOnInit(){


    this.authentication.getConnectedUser().then();

  }
}
