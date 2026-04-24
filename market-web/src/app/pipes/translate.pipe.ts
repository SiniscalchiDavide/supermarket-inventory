import { Pipe, PipeTransform, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { I18nService } from '../services/i18n.service';
import { Subscription } from 'rxjs';

// Pipe personalizzato per tradurre stringhe nei template HTML.
// Es: {{ 'HOME.TITLE' | translate }}
@Pipe({
  name: 'translate',
  standalone: true,
  // 'pure: false' è fondamentale: permette ad Angular di ricalcolare il pipe 
  // anche se il parametro di input non cambia (necessario per cambiare lingua in tempo reale)
  pure: false 
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  // Inietta il servizio di internazionalizzazione e il ChangeDetectorRef per forzare l'aggiornamento
  private i18n = inject(I18nService);
  private cdr = inject(ChangeDetectorRef);
  private sub: Subscription;
  
  // Cache locale per ottimizzare le prestazioni
  private currentKey: string | null = null;
  private currentResult: string | null = null;

  constructor() {
    // Si sottoscrive ai cambiamenti di lingua del servizio
    this.sub = this.i18n.currentLang$.subscribe(() => {
      // Se c'è una chiave già caricata, la ritraduce e forza la vista ad aggiornarsi
      if (this.currentKey) {
        this.currentResult = this.i18n.translate(this.currentKey);
        this.cdr.markForCheck();
      }
    });
  }

  // Metodo core del pipe: riceve la stringa HTML e la trasforma
  transform(key: string): string {
    // Ottimizzazione: ritraduce solo se la chiave è diversa da quella in cache
    if (this.currentKey !== key) {
      this.currentKey = key;
      this.currentResult = this.i18n.translate(key);
    }
    return this.currentResult || key;
  }

  // Pulisce la sottoscrizione quando il componente/pipe viene distrutto (evita memory leaks)
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
