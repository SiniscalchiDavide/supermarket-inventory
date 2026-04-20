import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { Observable, map } from 'rxjs';

// Componente Elettronica: mostra i prodotti della sezione Elettronica
// Implementa OnInit per caricare i prodotti al caricamento della pagina
@Component({
  selector: 'app-elettronica',                // Selettore: <app-elettronica></app-elettronica>
  imports: [CommonModule],                   // Importa direttive comuni (*ngFor, *ngIf)
  templateUrl: './elettronica.html',         // Template HTML
  styleUrl: './elettronica.css'              // Stili CSS specifici
})
export class Elettronica implements OnInit {
  // Inietta il servizio prodotti usando la sintassi moderna inject()
  private productService = inject(ProductService);
  
  // Observable che emette un array di prodotti filtrati per questa sezione
  // Il $ è una convenzione per indicare che è un Observable
  products$!: Observable<Product[]>;

  // Viene eseguito automaticamente quando il componente viene inizializzato e reso visibile
  ngOnInit(): void {
    // Si sottoscrive ai prodotti dal servizio
    // Filtra per mantenere solo i prodotti della sezione 'elettronica'
    this.products$ = this.productService.products$.pipe(
      map(products => products.filter(p => p.section === 'elettronica'))
    );
  }
}