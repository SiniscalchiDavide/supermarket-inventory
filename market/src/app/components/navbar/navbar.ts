import { Component } from '@angular/core';
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
  isDark = false;

  constructor(public ls: LinguaService, private router: Router) {}

  // Questo "getter" viene letto continuamente da Angular.
  // Controlla se nel browser c'è scritto che l'utente è loggato.
  get isLogged(): boolean {
    return localStorage.getItem('isLogged') === 'true';
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-mode');
  }

  setLang(lang: 'it' | 'en' | 'zh' | 'tl') {
    this.ls.cambiaLingua(lang);
  }

  // Funzione per uscire dall'account
  logout() {
    // Cancelliamo solo la sessione attiva, NON la lista "users"
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLogged');
    
    // Rimandiamo l'utente alla pagina di login (o alla home, come preferisci)
    this.router.navigate(['/login']);
  }
}