import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-find-user',
  standalone: true,
  imports: [],
  templateUrl: './find-user.component.html',
  styleUrl: './find-user.component.scss'
})
export class FindUserComponent {

  http: HttpClient = inject(HttpClient);

}
