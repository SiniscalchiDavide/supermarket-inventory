import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-altro',
  imports: [CommonModule],
  templateUrl: './altro.html',
  styleUrl: './altro.css'
})
export class Altro implements OnInit {
  // Con inject() evitiamo di dover dichiarare ProductService nei parametri del costruttore.
  // È una sintassi più moderna e pulita.
  private productService = inject(ProductService);
  
  // Prepariamo il "tubo" in cui passeranno i dati (notare il $ alla fine che è una convenzione per gli Observable)
  products$!: Observable<Product[]>;

  ngOnInit(): void {
    // Filtriamo la lista generale che arriva dal servizio.
    // Usiamo filter per assicurarci di visualizzare solo i prodotti classificati come 'altro'.
    this.products$ = this.productService.products$.pipe(
      map(products => products.filter(p => p.section === 'altro'))
    );
  }
}