import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from './auth-services';

export const authGuard: CanActivateFn = (route, state) => {
  const svc = inject(AuthServices) as AuthServices;
  const router = inject(Router);
  
  //sert à garder l'id de l'étudiant sélectionné
  
  // il faut que je gère le fait que ce soit null (maybe avec une opérateur ternaire ? )
  let isConnected= svc.isLoggedIn();
  
  if (isConnected){
    return true;
  }
  else {
    return router.navigate(["/login"]);
  }
};
