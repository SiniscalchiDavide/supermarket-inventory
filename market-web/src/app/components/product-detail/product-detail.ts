import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';

// Componente figlio che visualizza i dettagli di un singolo prodotto
@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush  // Rileva cambiamenti solo su input/eventi, non su cambiamenti esterni
})
export class ProductDetail {
  // Input: riceve il prodotto dal componente padre (ProductList)
  // undefined significa "nessun prodotto selezionato" (mostra il messaggio generico)
  @Input('product') product: Product | undefined;

  // Output: emette l'ID del prodotto da eliminare verso il padre
  @Output() delete = new EventEmitter<number>();

  // Invia l'evento delete al padre per eliminare il prodotto
  elimina() {
    if (this.product) {
      this.delete.emit(this.product.id);
    }
  }
}