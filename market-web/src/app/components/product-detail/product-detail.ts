import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush // Strategia per ottimizzazione performance
})
export class ProductDetail {
  // Input con alias 'product'
  @Input('product') product: Product | undefined;

  // Output per inviare l'eliminazione al padre
  @Output() delete = new EventEmitter<number>();

  // Invia evento di eliminazione
  elimina() {
    if (this.product) {
      this.delete.emit(this.product.id);
    }
  }
}