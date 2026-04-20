import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-alimentari',
  imports: [CommonModule],
  templateUrl: './alimentari.html',
  styleUrl: './alimentari.css'
})
export class Alimentari implements OnInit {
  // Richiamiamo il servizio globale dei prodotti
  private productService = inject(ProductService);
  
  // Observable (flusso di dati continuo) che conterrà solo i prodotti di questa sezione
  products$!: Observable<Product[]>;

  // Questa funzione viene eseguita in automatico appena si apre la pagina
  ngOnInit(): void {
    // Ci agganciamo a tutti i prodotti e usiamo la "pipe" con "map" per filtrarli.
    // filter() scarta tutti i prodotti che non hanno la sezione uguale a 'alimentari-e-bevande'
    this.products$ = this.productService.products$.pipe(
      map(products => products.filter(p => p.section === 'alimentari-e-bevande'))
    );
  }
}