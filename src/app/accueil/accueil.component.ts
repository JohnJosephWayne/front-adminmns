import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";


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

  http: HttpClient = inject(HttpClient);

  ngOnInit(): void {
  }



}
