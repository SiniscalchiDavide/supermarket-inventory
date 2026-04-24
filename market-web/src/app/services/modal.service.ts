import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Interfaccia che definisce i dati mostrati nella finestra modale
export interface ModalData {
  title: string;    // Titolo della modale (es. "Errore", "Successo")
  message: string;  // Messaggio descrittivo per l'utente
}

// Servizio singleton per gestire lo stato globale delle finestre modali
// Sostituisce i classici "alert()" del browser con popup stilizzati e integrati
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // BehaviorSubject che memorizza lo stato attuale della modale (null = chiusa, ModalData = aperta)
  private modalSubject = new BehaviorSubject<ModalData | null>(null);
  
  // Observable pubblico che il componente Modal (app-modal) ascolta per aprirsi o chiudersi
  modalState$ = this.modalSubject.asObservable();

  // Apre la modale inviando i dati al subject
  showModal(title: string, message: string) {
    this.modalSubject.next({ title, message });
  }

  // Chiude la modale resettando lo stato a null
  closeModal() {
    this.modalSubject.next(null);
  }
}
