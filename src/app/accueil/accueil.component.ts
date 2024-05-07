import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {AuthentificationService} from "../authentification.service";


@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})


export class AccueilComponent implements OnInit {
  authentication: AuthentificationService = inject(AuthentificationService)
  http: HttpClient = inject(HttpClient);

  ngOnInit(): void {
  }

}
