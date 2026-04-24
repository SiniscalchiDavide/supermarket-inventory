import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AuthService } from '../../services/auth.service';

// Componente Home: pagina iniziale dell'applicazione
// Contiene un semplice messaggio di benvenuto e un pulsante per navigare ai prodotti
@Component({
  selector: 'app-home',           // Selettore: <app-home></app-home>
  imports: [CommonModule, TranslatePipe],                    // Non importa altri componenti
  templateUrl: './home.html',     // Template HTML
  styleUrl: './home.css'          // Stili CSS specifici del componente
})
export class Home {
  // Inietta il Router e AuthService per la navigazione tra le pagine e logica di auth
  private router = inject(Router);
  private authService = inject(AuthService);

  // Metodo per controllare se l'utente è amministratore (usato per nascondere il bottone)
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // Gestisce la logica condizionale del pulsante "Scopri i nostri prodotti"
  vaiAiProdotti() {
    // Se non è loggato -> va alla pagina di login
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } 
    // Se è loggato ma non è admin -> va alla pagina dei giocattoli
    else if (!this.authService.isAdmin()) {
      this.router.navigate(['/sezione/giocattoli']).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}