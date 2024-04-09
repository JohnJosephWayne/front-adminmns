import { Routes } from '@angular/router';
import {AccueilComponent} from "./accueil/accueil.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {PagenontrouveeComponent} from "./pagenontrouvee/pagenontrouvee.component";

export const routes: Routes = [
  {path:"accueil", component: AccueilComponent},
  {path: "connexion", component : ConnexionComponent},
  {path: "", redirectTo:"accueil", pathMatch:'full'},
  {path:"**", component: PagenontrouveeComponent}
];
