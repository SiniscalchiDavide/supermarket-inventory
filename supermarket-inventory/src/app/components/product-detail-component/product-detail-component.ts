/*
  PRODUCT DETAIL COMPONENT
  ========================
  Componente responsabile di:
  - Visualizzazione dettagli del prodotto selezionato
  - Mostrare messaggio "Nessun prodotto selezionato" (ng-template)
  - Ricevere i dati del prodotto via @Input
  
  Props @Input:
  - prodotto: oggetto Product da visualizzare
*/

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../product';

@Component({
  selector: 'app-product-detail-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.css',
})
export class ProductDetailComponent {
  // Requisito Traccia: Riceve tramite @Input i dati del prodotto
  @Input() prodotto?: Product;
}