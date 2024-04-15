import {Routes} from '@angular/router';
import {AccueilComponent} from "./accueil/accueil.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {PageNonTrouveeComponent} from "./page_non_trouvee/pagenontrouvee.component";
import {InscriptionComponent} from "./inscription/inscription.component";

export const routes: Routes = [
  {path: "accueil", component: AccueilComponent},
  {path: "connexion", component: ConnexionComponent},
  {path: "inscription", component: InscriptionComponent},
  {path: "", redirectTo: "accueil", pathMatch: 'full'},
  {path: "**", component: PageNonTrouveeComponent}
];
