import { Component } from '@angular/core';
import { Product } from '../../product';
import { CommonModule } from '@angular/common'; // Necessario per far funzionare *ngFor
import { ProductDetailComponent } from '../product-detail-component/product-detail-component'
@Component({
  selector: 'app-product-list-component',
  imports: [CommonModule, ProductDetailComponent], //Per usare angular in html
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.css',
})
export class ProductListComponent {
  // Lista Beauty(Self-Care)
  prodotti: Product[] = [
    { id: 1, name: 'Siero Vitamina C', price: 19.90, description: '[Skincare] Illuminante...' },
    { id: 2, name: 'Mascara Allungante HD', price: 13.00, description: '[Make-up] Definisce...' },
    { id: 3, name: 'E-Rasoio Precision', price: 22.00, description: '[Grooming] Ideale...' },
    { id: 4, name: 'Shampoo Cheratina', price: 4.50, description: '[Haircare] Trattamento...' },
    { id: 5, name: 'Rossetto Matte', price: 9.90, description: '[Make-up] Colore...' }
  ];

  // Questa variabile terrà traccia del prodotto che l'utente clicca
  prodottoSelezionato?: Product;

  // Questa funzione verrà chiamata quando un prodotto verrà cliccato nell'html
  selezionaProdotto(p: Product): void {
    this.prodottoSelezionato = p;
    console.log('Prodotto selezionato:', p.name); // Utile per testare nel terminale/console
  }
}
