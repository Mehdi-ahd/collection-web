import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.token();
  // login/register : pas encore de token → on n'attache pas d'Authorization
  const isAuthCall = req.url.endsWith('/login') || req.url.endsWith('/register');

  const request = (token && !isAuthCall)
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;
  // req est immutable → on passe une COPIE enrichie

  return next(request).pipe(          // next = "va, exécute la requête"
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {     // token invalide/expiré/révoqué
        authService.clearSession();
        router.navigate(['/login']);
      }
      return throwError(() => error); // on relance l'erreur vers le composant
    })
  );
};
