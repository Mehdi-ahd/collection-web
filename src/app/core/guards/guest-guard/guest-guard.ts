import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

/**
 * Guard inverse de authGuard : empêche un utilisateur déjà connecté
 * (token présent) d'accéder aux pages login / register.
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.token() ? router.createUrlTree(['/collection']) : true;
};
