/*
  FOOD PAGE COMPONENT
  ===================
  Pagina dedicata alla visualizzazione dei prodotti alimentari
  
  Struttura:
  - Categorie: Dispensa, Fresco, Snack e Dolci, Bevande
  - Utilizza ProductListComponent per la visualizzazione
  - Array di 9+ prodotti alimentari
*/

import { Component } from '@angular/core';
import { Product } from '../../product'; // Assicurati che il percorso sia corretto
import { ProductListComponent } from '../../components/product-list-component/product-list-component';
import { LinguaService } from '../../lingua';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [ProductListComponent], // Importiamo il componente lista universale
  templateUrl: './food-page.html'
})
export class FoodPageComponent {
  
  // 1. Definiamo le categorie per i bottoni in alto
  categorieCibo: string[] = ['Dispensa', 'Fresco', 'Snack e Dolci', 'Bevande'];

  constructor(public ls: LinguaService) {}

  // 2. Creiamo l'array di prodotti per il cibo
  listaCibo: Product[] = [
    // Dispensa
    { id: 101, name: "Pasta Integrale 500g", price: 1.45, description: "Trafilata al bronzo, 100% grano italiano.", category: "Dispensa" },
    { id: 102, name: "Riso Basmati", price: 2.80, description: "Chicchi lunghi e profumati, ideale per contorni.", category: "Dispensa" },
    { id: 103, name: "Passata di Pomodoro", price: 0.99, description: "Pomodoro San Marzano, densa e dolce.", category: "Dispensa" },
    
    // Fresco
    { id: 201, name: "Yogurt Greco Bianco", price: 1.20, description: "Senza grassi, ricco di proteine.", category: "Fresco" },
    { id: 202, name: "Mozzarella di Bufala", price: 3.50, description: "Freschissima, da latte di bufala campana.", category: "Fresco" },
    
    // Snack e Dolci
    { id: 301, name: "Biscotti alla Nocciola", price: 2.90, description: "Con granella di nocciole tostate.", category: "Snack e Dolci" },
    { id: 302, name: "Cioccolato Fondente 85%", price: 1.80, description: "Cacao pregiato, gusto intenso.", category: "Snack e Dolci" },
    
    // Bevande
    { id: 401, name: "Succo di Mela Bio", price: 2.10, description: "100% mela, senza zuccheri aggiunti.", category: "Bevande" },
    { id: 402, name: "Tè Verde Matcha", price: 4.50, description: "In polvere, ricco di antiossidanti.", category: "Bevande" }
  ];
}