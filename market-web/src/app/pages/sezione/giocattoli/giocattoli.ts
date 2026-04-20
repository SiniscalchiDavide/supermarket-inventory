import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-giocattoli',
  imports: [CommonModule],
  templateUrl: './giocattoli.html',
  styleUrl: './giocattoli.css'
})
export class Giocattoli implements OnInit {
  // Richiamiamo il servizio globale per avere i dati di tutti i prodotti
  private productService = inject(ProductService);
  
  // Observable in cui mettiamo i prodotti da inviare alla vista HTML
  products$!: Observable<Product[]>;

  ngOnInit(): void {
    // Filtriamo la lista generale. Vogliamo SOLO i prodotti la cui stringa section è 'giocattoli'
    this.products$ = this.productService.products$.pipe(
      map(products => products.filter(p => p.section === 'giocattoli'))
    );
  }
}