import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core'; // Input serve per ricevere dati dall'esterno
import { Product } from '../../product'; // Importiamo l'interfaccia per sapere com'è fatto un prodotto

@Component({
  selector: 'app-product-detail-component',
  imports: [CommonModule],
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.css',
})
export class ProductDetailComponent {
  /* Il decoratore @Input() trasforma questa variabile in una "porta d'ingresso".
     Permette al componente 'ProductList' di passarci dentro il prodotto cliccato.
     Il '?' significa che all'inizio può essere vuoto (undefined).
  */
  @Input() prodotto?: Product;
}
