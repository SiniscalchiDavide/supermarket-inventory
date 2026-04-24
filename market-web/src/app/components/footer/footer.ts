import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

// Componente Footer: mostra il piè di pagina dell'applicazione
// È un componente di presentazione puro (nessuna logica, solo template HTML e stili CSS)
@Component({
  selector: 'app-footer',           // Selettore: <app-footer></app-footer>
  imports: [CommonModule, TranslatePipe],                      // Non importa altri componenti
  templateUrl: './footer.html',     // Template HTML
  styleUrl: './footer.css',         // Stili CSS specifici del componente
})
export class Footer {
  // Componente senza logica: gestisce solo la presentazione del footer
}
