import {Routes} from '@angular/router';
import {AccueilComponent} from "./accueil/accueil.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {PageNonTrouveeComponent} from "./page_non_trouvee/pagenontrouvee.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {EditModelUserComponent} from "./edit_model_user/edit_model-user.component";
import {ListModelUserComponent} from "./list-model-user/list-model-user.component";

export const routes: Routes = [
  {path: "accueil", component: AccueilComponent},
  {path: "connexion", component: ConnexionComponent},
  {path: "inscription", component: InscriptionComponent},
  {path: "edit-user", component: EditModelUserComponent},
  {path: "edit-user/:id", component: EditModelUserComponent},
  {path: "list-user", component: ListModelUserComponent},
  {path: "", redirectTo: "accueil", pathMatch: 'full'},
  {path: "**", component: PageNonTrouveeComponent}
];
