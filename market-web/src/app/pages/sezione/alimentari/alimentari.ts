import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { SidePanelService } from '../../../services/side-panel.service';
import { Observable, map } from 'rxjs';
import { TranslatePipe } from '../../../pipes/translate.pipe';

// Componente Alimentari: mostra i prodotti della sezione alimentari e bevande
// Implementa OnInit per caricare i prodotti al caricamento della pagina
@Component({
  selector: 'app-alimentari',                 // Selettore: <app-alimentari></app-alimentari>
  imports: [CommonModule, TranslatePipe],                   // Importa direttive comuni (*ngFor, *ngIf)
  templateUrl: './alimentari.html',          // Template HTML
  styleUrl: './alimentari.css'               // Stili CSS specifici
})
export class Alimentari implements OnInit {
  // Inietta il servizio globale dei prodotti
  private productService = inject(ProductService);
  private sidePanelService = inject(SidePanelService);
  
  // Observable che emette un array di prodotti filtrati per questa sezione
  // Il ! (non-null assertion) dice a TypeScript che sarà inizializzato in ngOnInit
  products$!: Observable<Product[]>;

  // Viene eseguito automaticamente quando il componente viene inizializzato
  // Qui carichiamo i prodotti della sezione
  ngOnInit(): void {
    // Si sottoscrive ai prodotti da productService usando la pipe RxJS
    this.products$ = this.productService.products$.pipe(
      map(products => products.filter(p => p.section === 'alimentari-e-bevande'))
    );
  }

  openPanel(product: Product) {
    this.sidePanelService.openPanel(product);
  }
}