import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-beauty',
  imports: [CommonModule],
  templateUrl: './beauty.html',
  styleUrl: './beauty.css'
})
export class Beauty implements OnInit {
  // Richiamiamo il ProductService, il cervello centrale che ci dà i prodotti salvati
  private productService = inject(ProductService);
  
  // Dichiarazione dell'Observable: un tubo speciale dove passano i dati man mano che arrivano
  products$!: Observable<Product[]>;

  // ngOnInit parte automaticamente prima che la vista HTML venga mostrata
  ngOnInit(): void {
    // Accediamo alla proprietà globale products$ del servizio
    // poi usiamo un filtro per trattenere solo i prodotti il cui campo "section" equivale a 'beauty'
    this.products$ = this.productService.products$.pipe(
      map(products => products.filter(p => p.section === 'beauty'))
    );
  }
}