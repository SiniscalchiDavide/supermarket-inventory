import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Servizio singleton per gestire lo stato globale della barra di ricerca
// Permette a componenti diversi (app.ts, navbar.ts) di sincronizzarsi
@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  // BehaviorSubject privato che emette true quando ricerca è aperta, false quando chiusa
  private searchOpenSubject = new BehaviorSubject<boolean>(false);
  
  // Observable pubblico che i componenti possono ascoltare per sapere lo stato della ricerca
  searchOpen$ = this.searchOpenSubject.asObservable();

  // Metodo per aprire/chiudere la ricerca: notifica tutti gli subscribers
  setSearchOpen(open: boolean) {
    this.searchOpenSubject.next(open);
  }

  // Metodo per ottenere lo stato attuale della ricerca (senza ascoltare gli Observable)
  isSearchOpen(): boolean {
    return this.searchOpenSubject.value;
  }
}
