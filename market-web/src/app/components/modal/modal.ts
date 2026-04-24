import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { ThemeService } from '../../services/theme.service';

// Componente globale per le finestre modali (popup di sistema)
// È standalone e si aggancia al servizio ModalService per mostrare messaggi (es. errori di login)
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Sfondo scuro e sfocato (backdrop). Chiude la modale se cliccato fuori -->
    <div class="modal-backdrop" *ngIf="modalData$ | async as data" (click)="close()">
      
      <!-- Contenitore effettivo del popup. Usa stopPropagation per non chiudere se si clicca all'interno -->
      <div class="modal-dialog custom-modal" (click)="$event.stopPropagation()" [ngClass]="{'dark-modal': isDark()}">
        <div class="modal-content">
          <div class="modal-header">
            <!-- Titolo dinamico dal servizio -->
            <h5 class="modal-title">{{ data.title }}</h5>
            <!-- Bottone "X" per chiudere. Cambia colore in dark mode -->
            <button type="button" class="btn-close" [ngClass]="{'btn-close-white': isDark()}" (click)="close()"></button>
          </div>
          
          <div class="modal-body">
            <!-- Messaggio dinamico dal servizio -->
            <p>{{ data.message }}</p>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" style="border-radius: 50px;" (click)="close()">OK</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Stili dello sfondo sfocato dietro il popup */
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1050; /* Sopra a quasi tutto il resto del sito */
    }
    
    /* Stile della "finestrella" bianca al centro */
    .custom-modal {
      background: white;
      border-radius: 30px; /* Angoli molto smussati stile Apple */
      padding: 20px;
      min-width: 300px;
      max-width: 500px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    
    /* Variante scura del popup */
    .dark-modal {
      background: #1c1c1e;
      color: white;
    }
    
    /* Rimuove i bordi default di Bootstrap */
    .modal-content {
      border: none;
      background: transparent;
    }
  `]
})
export class Modal {
  // Iniezione dei servizi necessari
  private modalService = inject(ModalService);
  private themeService = inject(ThemeService);
  
  // Collegamento diretto allo stato della modale. Quando c'è un dato (non null), il popup si apre
  modalData$ = this.modalService.modalState$;

  // Funzione che richiama il servizio per chiudere il popup
  close() {
    this.modalService.closeModal();
  }

  // Verifica il tema per applicare le classi CSS corrette
  isDark() {
    return this.themeService.isDarkMode();
  }
}
