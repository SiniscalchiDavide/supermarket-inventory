import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Mostra l'alert se non è loggato
  alert('Devi accedere o creare un account per continuare.');
  
  // Non permette l'accesso (il pulsante non funziona)
  return false;
};
