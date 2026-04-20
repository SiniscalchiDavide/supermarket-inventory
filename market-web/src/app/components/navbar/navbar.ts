import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Sezioni } from '../sezioni/sezioni';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, Sezioni],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  // Injectiamo il nostro ThemeService che "parla" col LocalStorage
  themeService = inject(ThemeService);
  // Injectiamo l'AuthService per gestire login/logout
  authService = inject(AuthService);

  // Questa funzione viene scatenata quando l'utente clicca sul pulsante della "luna" o del "sole"
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // Usiamo questa funzione nell'HTML per decidere quale icona (sole/luna) far apparire 
  // usando un IF implicito o ngClass.
  isDarkTheme(): boolean {
    return this.themeService.isDarkMode();
  }

  // Se l'utente clicca sul logo "Market", vogliamo che il sito scorra su (top: 0) fluidamente.
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Verifica se l'utente è loggato
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Logout: fa il logout e reindirizza a login
  logout() {
    this.authService.logout();
  }

  // Ottiene il nome dell'utente loggato per mostarlo eventualmente
  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.firstName + ' ' + user.lastName : '';
  }
}