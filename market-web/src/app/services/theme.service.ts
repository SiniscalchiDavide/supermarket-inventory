import { Injectable } from '@angular/core';

// Servizio singleton per gestire il tema scuro/chiaro dell'applicazione
// Usa localStorage per persistere la scelta dell'utente tra sessioni
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Chiave localStorage per salvare la preferenza di tema (dark o light)
  private readonly THEME_KEY = 'theme-preference';

  // Al caricamento dell'app, inizializza il tema basato su: preferenza salvata > preferenza di sistema
  constructor() {
    this.initTheme();
  }

  // Inizializza il tema all'avvio dell'applicazione
  // Priorità: 1) Preferenza salvata in localStorage 2) Preferenza di sistema (prefers-color-scheme)
  private initTheme() {
    // Legge il tema salvato in precedenza
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    
    if (savedTheme) {
      // Usa il tema salvato
      this.setTheme(savedTheme === 'dark');
    } else {
      // Altrimenti, chiede al sistema operativo la preferenza utente
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark);
    }
  }

  // Applica il tema impostando l'attributo data-theme su <html> e salvando la scelta in localStorage
  private setTheme(isDark: boolean) {
    if (isDark) {
      // Aggiunge l'attributo data-theme="dark" al tag html
      // CSS in styles.css e componenti specifici usano [data-theme='dark'] per stilizzare
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem(this.THEME_KEY, 'dark');
    } else {
      // Rimuove l'attributo per ritornare ai colori light di default
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(this.THEME_KEY, 'light');
    }
  }

  // Commuta il tema: da dark a light o viceversa
  // Usato dal bottone toggle nella navbar
  toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.setTheme(!isDark);
  }

  // Verifica se il tema attuale è scuro
  // Usato nei componenti per visualizzare l'icona giusta (luna vs sole)
  isDarkMode(): boolean {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }
}
