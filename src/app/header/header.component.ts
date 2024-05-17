import {Component, inject, OnInit} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatButton} from "@angular/material/button";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonToggle, MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{

  authentification = inject(AuthentificationService);
  router = inject(Router);
  user = inject(User)
  http: HttpClient = inject(HttpClient);

  ngOnInit(): void {
    this.http
      .get("http://localhost:8080/user-by-email/" + this.authentification.user.sub)
      .subscribe((user: any) => {
        this.user = user;
      });
  }
  onDeconnexion() {
    this.authentification.deconnexion();
    this.router.navigateByUrl('/connexion');
  }
}
