import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Componente Home: pagina iniziale dell'applicazione
// Fornisce una landing page con link ai prodotti
@Component({
  selector: 'app-home',           // Selettore: <app-home></app-home>
  imports: [],                    // Non importa altri componenti
  templateUrl: './home.html',     // Template HTML
  styleUrl: './home.css'          // Stili CSS specifici del componente
})
export class Home {
  // Inietta il Router per la navigazione tra le pagine
  constructor(private router: Router) {}

  // Naviga alla pagina dei prodotti (/info) e scrolls dolcemente in alto
  // Richiamato dal bottone "Vedi i prodotti" nel template
  vaiAiProdotti() {
    // navigate() ritorna una Promise che si risolve quando la navigazione è completata
    this.router.navigate(['/info']).then(() => {
      // Dopo la navigazione, scrolls all'inizio della pagina con effetto smooth
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}