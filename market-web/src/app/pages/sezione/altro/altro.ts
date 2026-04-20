import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { Observable, map } from 'rxjs';

// Componente Altro: mostra i prodotti della sezione "Altro"
// Implementa OnInit per caricare i prodotti al caricamento della pagina
@Component({
  selector: 'app-altro',                      // Selettore: <app-altro></app-altro>
  imports: [CommonModule],                   // Importa direttive comuni (*ngFor, *ngIf)
  templateUrl: './altro.html',               // Template HTML
  styleUrl: './altro.css'                    // Stili CSS specifici
})
export class Altro implements OnInit {
  // Inietta il servizio prodotti usando la sintassi moderna inject()
  // Questo è preferibile ai parametri del costruttore per chiarezza
  private productService = inject(ProductService);
  
  // Observable che emette un array di prodotti filtrati per questa sezione
  // Il $ alla fine è una convenzione per indicare che è un Observable
  products$!: Observable<Product[]>;

  // Viene eseguito automaticamente quando il componente viene inizializzato
  ngOnInit(): void {
    // Si sottoscrive ai prodotti e filtra per sezione === 'altro'
    // Mantiene solo i prodotti che appartengono a questa sezione
    this.products$ = this.productService.products$.pipe(
      map(products => products.filter(p => p.section === 'altro'))
    );
  }
}