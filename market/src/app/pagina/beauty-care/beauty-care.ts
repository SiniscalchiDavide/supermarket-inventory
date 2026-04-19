/*
  BEAUTY CARE PAGE COMPONENT
  ==========================
  Pagina dedicata alla visualizzazione dei prodotti di bellezza
  
  Struttura:
  - Categorie: Skincare, Haircare, Make-up, Men's Grooming
  - Utilizza ProductListComponent per la visualizzazione
  - Array di prodotti dedicati ai cosmetici e alla cura della persona
*/

import { Component } from '@angular/core';
import { Product } from '../../product';
import { ProductListComponent } from '../../components/product-list-component/product-list-component';
import { LinguaService } from '../../lingua'; // Controlla il percorso!

@Component({
  selector: 'app-beauty-page',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './beauty-care.html'
})
export class BeautyCareComponent {
  // Passiamo i nomi delle categorie per far generare i bottoni
  categorieBeauty: string[] = ['Skincare', 'Haircare', 'Make-up', "Men's Grooming"];

  constructor(public ls: LinguaService) {}

  // L'array originale che ha preparato la tua compagna
  listaBeauty: Product[] = [
    { id: 1, name: "Gel Detergente Purificante", price: 7.50, description: "Rimuove le impurità...", category: "Skincare" },
    { id: 2, name: "Tonico Illuminante AHA", price: 12.90, description: "Esfolia delicatamente...", category: "Skincare" },
    { id: 6, name: "Shampoo Protettivo Colore", price: 4.90, description: "Mantiene la brillantezza...", category: "Haircare" },
    { id: 11, name: "Fondotinta Fluido Idratante", price: 16.80, description: "Coprenza media con effetto naturale...", category: "Make-up" },
    { id: 16, name: "Olio Barba Ammorbidente", price: 12.50, description: "Idrata la pelle sottostante...", category: "Men's Grooming" }
    // ... (qui puoi incollare tutti e 20 i prodotti originali della compagna)
  ];
}