import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Guard (protezione) che blocca l'accesso alle rotte protette se l'utente non è loggato
// Usato su: /info, /sezione/*
export const authGuard: CanActivateFn = (route, state) => {
  // Inietta i servizi necessari
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica se l'utente è attualmente loggato
  if (authService.isLoggedIn()) {
    // Se loggato, permette l'accesso e ritorna true
    return true;
  }

  // Se NON loggato, mostra un alert all'utente con il motivo del blocco
  alert('Devi accedere o creare un account per continuare.');
  
  // Blocca l'accesso alla rotta ritornando false
  return false;
};
