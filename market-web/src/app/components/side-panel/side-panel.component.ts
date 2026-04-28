import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelService } from '../../services/side-panel.service';
import { ThemeService } from '../../services/theme.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

// Componente globale per il pannello laterale (Side Panel)
// Appare sulla destra dello schermo mostrando i dettagli completi di un prodotto
@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <!-- Sfondo oscurato e sfocato dietro il pannello. Cliccandolo si chiude il pannello -->
    <div class="side-panel-backdrop" *ngIf="product$ | async as product" (click)="close()">
      
      <!-- Pannello vero e proprio che scorre da destra. 'stopPropagation' impedisce che il click qui chiuda il pannello -->
      <div class="side-panel" (click)="$event.stopPropagation()" [ngClass]="{'dark-panel': isDark(), 'beauty-panel': isBeauty()}">
        
        <!-- Intestazione con titolo e pulsante X di chiusura -->
        <div class="side-panel-header">
          <h4 class="mb-0">{{ product.name }}</h4>
          <button type="button" class="btn-close" [ngClass]="{'btn-close-white': isDark()}" (click)="close()"></button>
        </div>
        
        <!-- Corpo del pannello con scroll interno -->
        <div class="side-panel-body">
          <!-- Area segnaposto per l'immagine del prodotto (attualmente usa un'icona Bootstrap) -->
          <div class="product-image-placeholder mb-4" [ngClass]="{'dark-placeholder': isDark()}">
            <i class="bi bi-box-seam display-1 text-muted"></i>
          </div>
          
          <!-- Prezzo formattato in Euro -->
          <h2 class="text-primary-accent mb-3">{{ product.price | currency:'EUR' }}</h2>
          
          <!-- Sezione: Descrizione -->
          <div class="mb-4">
            <h6 class="text-muted text-uppercase small">{{ 'PRODUCT.DESC' | translate }}</h6>
            <p>{{ product.description }}</p>
          </div>
          
          <!-- Sezione: Specifiche Tecniche e disponibilità -->
          <div class="mb-4">
            <h6 class="text-muted text-uppercase small">{{ 'PRODUCT.SPECS' | translate }}</h6>
            <ul class="list-unstyled">
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>{{ 'PRODUCT.CAT' | translate }} <span class="text-capitalize">{{ product.section }}</span></li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>{{ 'PRODUCT.AVAIL' | translate }} {{ product.quantity || 0 }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Stile dello sfondo che copre tutto lo schermo con effetto blur */
    .side-panel-backdrop {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 1060; /* Livello altissimo, copre anche la navbar */
      opacity: 0;
      animation: fadeIn 0.3s ease-out forwards;
    }
    
    /* Stile del pannello laterale bianco/scuro che entra da destra */
    .side-panel {
      position: fixed;
      top: 0; right: 0; 
      width: 100%;
      max-width: 450px; /* Larghezza fissa su desktop */
      height: 100%;
      background: rgba(255, 255, 255, 0.95);
      box-shadow: -10px 0 30px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      transform: translateX(100%); /* Parte nascosto fuori dallo schermo a destra */
      animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; /* Animazione di entrata molto morbida */
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
    }
    
    /* Animazioni CSS (Keyframes) */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); } /* 0 = posizione finale agganciata a destra */
    }
    
    /* Regole specifiche per il tema scuro (OLED black) */
    .dark-panel {
      background: rgba(28, 28, 30, 0.95);
      color: white;
      box-shadow: -10px 0 30px rgba(0,0,0,0.5);
    }

    /* --- Beauty specific styling for the side panel --- */
    .beauty-panel {
      background: linear-gradient(180deg, var(--beauty-card, #fff), var(--beauty-blush, #FADADD));
      color: var(--beauty-deep, #6E4142);
      box-shadow: -10px 0 40px rgba(110, 65, 66, 0.12);
    }
    .beauty-panel .side-panel-header {
      border-bottom: 1px solid rgba(192, 128, 129, 0.08);
    }
    .beauty-panel .product-image-placeholder {
      background: linear-gradient(135deg, #fdf2f4 0%, #f6e9eb 100%);
      box-shadow: inset 0 2px 10px rgba(0,0,0,0.03);
    }
    .beauty-panel .text-primary-accent {
      color: var(--beauty-rose, #C08081) !important;
      font-weight: 700;
      font-size: 1.2rem;
    }
    .side-panel-header {
      padding: 25px 30px;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dark-panel .side-panel-header {
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .side-panel-body {
      padding: 30px;
      overflow-y: auto; /* Permette lo scroll interno se il contenuto è lungo */
      flex: 1;
    }
    
    /* Box grigio che fa da finta immagine di copertina */
    .product-image-placeholder {
      height: 250px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
    }
    .dark-placeholder {
      background: linear-gradient(135deg, #2c2c2e 0%, #1c1c1e 100%);
      box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);
    }
    
    /* Comportamento Responsive per Cellulari */
    /* Su schermi piccoli, il pannello toglie i bordi arrotondati e occupa il 100% della larghezza */
    @media (max-width: 576px) {
      .side-panel {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  `]
})
export class SidePanelComponent {
  // Inietta i servizi necessari
  private sidePanelService = inject(SidePanelService);
  private themeService = inject(ThemeService);
  
  // Si aggancia al flusso dati del servizio. Quando arriva un prodotto, il pannello si apre.
  product$ = this.sidePanelService.panelState$;

  // Funzione per nascondere il pannello inviando un segnale "null" al servizio
  close() {
    this.sidePanelService.closePanel();
  }

  // Helper per controllare se applicare le classi CSS del tema scuro
  isDark() {
    return this.themeService.isDarkMode();
  }

  // Helper per verificare se la pagina corrente è in Beauty-mode (aggiunge la classe sul body)
  isBeauty() {
    try {
      return document.body.classList.contains('beauty-mode');
    } catch (e) {
      return false;
    }
  }
}
