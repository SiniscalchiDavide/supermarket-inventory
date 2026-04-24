import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

// Servizio singleton per gestire lo stato globale del pannello laterale (Side Panel)
// Permette di mostrare i dettagli di un prodotto da qualsiasi parte dell'app (es. dalla ricerca o dalle sezioni)
@Injectable({
  providedIn: 'root'
})
export class SidePanelService {
  // BehaviorSubject che conserva il prodotto attualmente mostrato nel pannello (null = pannello chiuso)
  private panelSubject = new BehaviorSubject<Product | null>(null);
  
  // Observable pubblico che il componente SidePanelComponent ascolta per reagire ai cambiamenti
  panelState$ = this.panelSubject.asObservable();

  // Apre il pannello laterale iniettandoci il prodotto selezionato
  openPanel(product: Product) {
    this.panelSubject.next(product);
  }

  // Chiude il pannello laterale impostando il prodotto a null
  closePanel() {
    this.panelSubject.next(null);
  }
}
