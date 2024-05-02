import {Component, Input} from '@angular/core';
import {
  MatTableModule
} from "@angular/material/table";

@Component({
  selector: 'app-list-generic',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './list-generic.component.html',
  styleUrl: './list-generic.component.scss'
})
export class ListGenericComponent {
  @Input()
  listeColonne: {columnId: string, columnName: string, columnProperty: (item:any)=>string}[]= [];

  @Input()
  liste: any[] = [];

  @Input()
  displayedColumns: string[]=[];


}
