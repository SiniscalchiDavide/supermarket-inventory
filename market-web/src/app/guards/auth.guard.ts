import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

// Guard (protezione) che blocca l'accesso alle rotte protette se l'utente non è loggato
// Usato su: /info, /sezione/* (vedi app.routes.ts)
export const authGuard: CanActivateFn = (route, state) => {
  // Inietta i servizi necessari tramite la funzione inject()
  const authService = inject(AuthService);
  const router = inject(Router);
  const modalService = inject(ModalService);

  // Verifica se l'utente è attualmente loggato controllando il servizio
  if (authService.isLoggedIn()) {
    // Se loggato, permette l'accesso e ritorna true, la rotta prosegue normalmente
    return true;
  }

  // Se NON loggato, mostra una finestra modale (popup) con il motivo del blocco
  modalService.showModal('Accesso Negato', 'Devi accedere o creare un account per continuare.');
  
  // Blocca l'accesso alla rotta ritornando false. L'utente rimarrà dov'è.
  return false;
};
