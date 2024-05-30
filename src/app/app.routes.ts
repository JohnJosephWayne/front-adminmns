import {Routes} from '@angular/router';
// import {AccueilAdministratifComponent} from "./accueil-administratif/accueil-administratif.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {PageNonTrouveeComponent} from "./page_non_trouvee/pagenontrouvee.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {EditStudentComponent} from "./edit_student/edit_student.component";
import {ListStudentComponent} from "./list-student/list-student.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";
import {ListEmployeeComponent} from "./list-employee/list-employee.component";

export const routes: Routes = [
  // {path: "accueil", component: AccueilAdministratifComponent},
  {path: "connexion", component: ConnexionComponent},
  {path: "inscription", component: InscriptionComponent},
  {path: "add-student", component: EditStudentComponent},
  {path: "edit-student/:id", component: EditStudentComponent},
  {path: "list-student", component: ListStudentComponent},
  {path: "add-employee", component: EditEmployeeComponent},
  {path: "edit-employee/:id", component: EditEmployeeComponent},
  {path: "list-employee", component: ListEmployeeComponent},
  {path: "", redirectTo: "accueil", pathMatch: 'full'},
  {path: "**", component: PageNonTrouveeComponent}
];
