import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Questa è la "chiave" che useremo per salvare e leggere i dati dal LocalStorage (memoria del browser).
  private readonly THEME_KEY = 'theme-preference';

  // Il costruttore viene eseguito non appena l'app parte. Qui richiamiamo la funzione che sceglie il tema.
  constructor() {
    this.initTheme();
  }

  // Inizializza il tema basato su quello che l'utente ha scelto l'ultima volta o sulla preferenza di sistema.
  private initTheme() {
    // Leggiamo la memoria del browser: c'è già una scelta salvata per "theme-preference"?
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      // Se esiste, impostiamo il tema su dark o light in base a quello che c'è scritto.
      this.setTheme(savedTheme === 'dark');
    } else {
      // Se non esiste, chiediamo al browser/sistema operativo se l'utente preferisce il tema scuro (prefers-color-scheme).
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark);
    }
  }

  // Questa funzione fa il vero e proprio lavoro sporco di cambiare i CSS.
  private setTheme(isDark: boolean) {
    if (isDark) {
      // Mettiamo un attributo HTML 'data-theme="dark"' sul tag <html> principale.
      // In styles.css ci sono regole CSS che si attivano solo quando c'è questo attributo!
      document.documentElement.setAttribute('data-theme', 'dark');
      // Salviamo la scelta per la prossima volta che l'utente apre il sito.
      localStorage.setItem(this.THEME_KEY, 'dark');
    } else {
      // Se è chiaro, togliamo l'attributo, così si torna ai colori di default.
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(this.THEME_KEY, 'light');
    }
  }

  // Funzione pubblica per fare lo switch da un bottone. Legge il tema attuale e lo inverte (NOT logico).
  toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.setTheme(!isDark);
  }

  // Ritorna 'true' o 'false'. Utile nei componenti (come la Navbar) per capire se disegnare la luna o il sole.
  isDarkMode(): boolean {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }
}
