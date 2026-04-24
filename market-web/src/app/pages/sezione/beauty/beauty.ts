import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { SidePanelService } from '../../../services/side-panel.service';
import { Observable, map } from 'rxjs';
import { TranslatePipe } from '../../../pipes/translate.pipe';

// Componente Beauty: mostra i prodotti della sezione Beauty (prodotti di bellezza)
// Implementa OnInit per caricare i prodotti al caricamento della pagina
@Component({
  selector: 'app-beauty',                     // Selettore: <app-beauty></app-beauty>
  imports: [CommonModule, TranslatePipe],                   // Importa direttive comuni (*ngFor, *ngIf)
  templateUrl: './beauty.html',              // Template HTML
  styleUrl: './beauty.css'                   // Stili CSS specifici
})
export class Beauty implements OnInit {
  // Inietta il servizio prodotti: qui arrivano tutti i prodotti dal localStorage
  private productService = inject(ProductService);
  private sidePanelService = inject(SidePanelService);
  
  // Observable che emette un array di prodotti filtrati per questa sezione
  // Il ! indica che sarà inizializzato in ngOnInit
  products$!: Observable<Product[]>;

  // Viene eseguito automaticamente quando il componente viene inizializzato
  ngOnInit(): void {
    // Si sottoscrive ai prodotti da productService usando la pipe RxJS
    this.products$ = this.productService.products$.pipe(
      map(products => products.filter(p => p.section === 'beauty'))
    );
  }

  openPanel(product: Product) {
    this.sidePanelService.openPanel(product);
  }
}