import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-elettronica',
  imports: [CommonModule],
  templateUrl: './elettronica.html',
  styleUrl: './elettronica.css'
})
export class Elettronica implements OnInit {
  // inject: la nuova sintassi di Angular per usare i servizi
  private productService = inject(ProductService);
  
  // Array dinamico di prodotti
  products$!: Observable<Product[]>;

  // Il metodo che viene chiamato automaticamente appena il componente appare sullo schermo
  ngOnInit(): void {
    // Colleghiamo questa variabile al flusso principale dei prodotti
    // poi passiamo in mezzo a un "filtro" (map) che lascia passare solo i prodotti tech
    this.products$ = this.productService.products$.pipe(
      map(products => products.filter(p => p.section === 'elettronica'))
    );
  }
}