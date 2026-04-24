import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { SidePanelService } from '../../../services/side-panel.service';
import { Observable, map } from 'rxjs';
import { TranslatePipe } from '../../../pipes/translate.pipe';

// Componente Giocattoli: mostra i prodotti della sezione Giocattoli
// Implementa OnInit per caricare i prodotti al caricamento della pagina
@Component({
  selector: 'app-giocattoli',                // Selettore: <app-giocattoli></app-giocattoli>
  imports: [CommonModule, TranslatePipe],                  // Importa direttive comuni (*ngFor, *ngIf)
  templateUrl: './giocattoli.html',         // Template HTML
  styleUrl: './giocattoli.css'              // Stili CSS specifici
})
export class Giocattoli implements OnInit {
  // Inietta il servizio prodotti per accedere ai dati globali di tutti i prodotti
  private productService = inject(ProductService);
  private sidePanelService = inject(SidePanelService);
  
  // Observable che emette un array di prodotti filtrati per questa sezione
  products$!: Observable<Product[]>;

  // Viene eseguito automaticamente quando il componente viene inizializzato
  ngOnInit(): void {
    // Si sottoscrive ai prodotti dal servizio
    // Filtra per mantenere solo i prodotti della sezione 'giocattoli'
    this.products$ = this.productService.products$.pipe(
      map(products => products.filter(p => p.section === 'giocattoli'))
    );
  }

  openPanel(product: Product) {
    this.sidePanelService.openPanel(product);
  }
}