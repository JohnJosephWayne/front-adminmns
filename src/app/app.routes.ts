import {Routes} from '@angular/router';
import {ConnexionComponent} from "./connexion/connexion.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {PageNonTrouveeComponent} from "./page_non_trouvee/pagenontrouvee.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {EditStudentComponent} from "./edit_student/edit_student.component";
import {ListStudentComponent} from "./list-student/list-student.component";
import {ValidationAbsenceComponent} from "./validation_absence/validation-absence.component";
import {adminGuard} from "./admin.guard";
import {EditAbsenceComponent} from "./edit_absence/edit-absence.component";
import {DepotAbsenceComponent} from "./depot_absence/depot-absence.component";

export const routes: Routes = [
  {path: "accueil", component: AccueilComponent},
  {path: "connexion", component: ConnexionComponent},
  {path: "inscription", component: InscriptionComponent},
  {path: "add-student", component: EditStudentComponent, canActivate: [adminGuard]},
  {path: "edit-student/:id", component: EditStudentComponent, canActivate: [adminGuard]},
  {path: "list-student", component: ListStudentComponent},
  {path: "add-absence", component: EditAbsenceComponent, canActivate: [adminGuard]},
  {path: "edit-absence/:id", component: EditAbsenceComponent, canActivate: [adminGuard]},
  {path: "list-absence", component: ValidationAbsenceComponent},
  {path: "depot/absence", component: DepotAbsenceComponent},
  {path: "", redirectTo: "connexion", pathMatch: 'full'},
  {path: "**", component: PageNonTrouveeComponent}
];
