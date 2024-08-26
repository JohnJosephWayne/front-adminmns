import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authentification = inject(AuthentificationService);
  const router = inject(Router);


  return authentification.getConnectedUser().then(user =>
    {

      if(user == null || user.role?.name != "ADMIN") {
        return router.parseUrl('/connexion');
      }

      return true;
    }
  )
};
