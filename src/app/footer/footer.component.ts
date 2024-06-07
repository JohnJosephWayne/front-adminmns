import { Component } from '@angular/core';
import {MatSidenavContainer} from "@angular/material/sidenav";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatSidenavContainer
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
