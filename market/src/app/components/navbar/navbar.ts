import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // <-- Aggiunto Router
import { LinguaService } from '../../lingua';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  isDark: boolean;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(public ls: LinguaService, private router: Router) {
    // Carica il tema salvato (solo in browser)
    this.isDark = this.isBrowser && localStorage.getItem('darkMode') === 'true';
    this.applicaTema();
  }

  // Questo "getter" viene letto continuamente da Angular.
  // Controlla se nel browser c'è scritto che l'utente è loggato.
  get isLogged(): boolean {
    return this.isBrowser && localStorage.getItem('isLogged') === 'true';
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isBrowser) {
      localStorage.setItem('darkMode', this.isDark.toString());
    }
    this.applicaTema();
  }

  private applicaTema() {
    if (this.isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  setLang(lang: 'it' | 'en' | 'zh' | 'tl') {
    this.ls.cambiaLingua(lang);
  }

  // Funzione per uscire dall'account
  logout() {
    // Cancelliamo solo la sessione attiva, NON la lista "users"
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isLogged');
    }
    
    // Rimandiamo l'utente alla pagina di login (o alla home, come preferisci)
    this.router.navigate(['/login']);
  }
}