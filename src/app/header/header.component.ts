import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonToggle, MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authentification = inject(AuthentificationService);
  router = inject(Router);

  onDeconnexion() {
    this.authentification.deconnexion();
    this.router.navigateByUrl('/connexion');
  }
}
