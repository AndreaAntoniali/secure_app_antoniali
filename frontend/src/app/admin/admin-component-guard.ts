import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../shared/auth/auth-services';
import { inject } from '@angular/core';

export const adminComponentGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authSvc = inject(AuthServices);
  if (!authSvc.isLoggedIn() || !authSvc.isAdmin()) {
    console.log("isLoggedIn ?", authSvc.isLoggedIn())
    console.log("is admin?", authSvc.isAdmin())
    return router.navigate(['home']);
  }
  return true;
};
