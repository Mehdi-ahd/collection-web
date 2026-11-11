import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

/**
 * Protège les routes réservées aux utilisateurs connectés.
 * On ne teste que la PRÉSENCE du token (pas sa validité) :
 * la validité est du ressort du backend, qui répond 401 —
 * l'intercepteur intercepte alors ce 401 pour clearSession() + /login.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.token() ? true : router.createUrlTree(['/login']);
};
