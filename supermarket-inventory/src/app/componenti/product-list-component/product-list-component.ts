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
    // 1. Skincare
    { id: 1, name: "Gel Detergente Purificante", price: 7.50, description: "Rimuove le impurità e l'eccesso di sebo senza seccare la pelle.", category: "Skincare" },
    { id: 2, name: "Tonico Illuminante AHA", price: 12.90, description: "Esfolia delicatamente per rivelare una carnagione più radiosa.", category: "Skincare" },
    { id: 3, name: "Crema Giorno SPF 30", price: 15.50, description: "Idratante quotidiano con protezione solare integrata.", category: "Skincare" },
    { id: 4, name: "Contorno Occhi Defaticante", price: 14.00, description: "Riduce borse e occhiaie grazie all'estratto di caffeina.", category: "Skincare" },
    { id: 5, name: "Maschera Notte Rimpolpante", price: 18.00, description: "Trattamento intensivo che agisce mentre dormi per un viso riposato.", category: "Skincare" },

    // 2. Haircare
    { id: 6, name: "Shampoo Protettivo Colore", price: 4.90, description: "Mantiene la brillantezza del colore più a lungo, proteggendo dai lavaggi.", category: "Haircare" },
    { id: 7, name: "Maschera Intensiva al Pantenolo", price: 7.50, description: "Nutre in profondità i capelli stressati da piastra e phon.", category: "Haircare" },
    { id: 8, name: "Spray Termoprotettore", price: 9.90, description: "Scudo invisibile contro il calore fino a 230°C.", category: "Haircare" },
    { id: 9, name: "Siero Anti-Crespo alla Seta", price: 11.20, description: "Disciplina le ciocche ribelli lasciandole morbide e lucenti.", category: "Haircare" },
    { id: 10, name: "Scrub Cuoio Capelluto", price: 8.50, description: "Rimuove residui di prodotti e cellule morte per capelli più sani.", category: "Haircare" },

    // 3. Make-up
    { id: 11, name: "Fondotinta Fluido Idratante", price: 16.80, description: "Coprenza media con effetto naturale, ideale per pelli secche.", category: "Make-up" },
    { id: 12, name: "Cipria Minerale Trasparente", price: 10.50, description: "Fissa il trucco e opacizza le zone lucide per tutto il giorno.", category: "Make-up" },
    { id: 13, name: "Mascara Allungante HD", price: 13.00, description: "Definisce ogni singola ciglia senza creare grumi.", category: "Make-up" },
    { id: 14, name: "Illuminante Liquido Champagne", price: 11.00, description: "Punti luce strategici per un effetto pelle baciata dal sole.", category: "Make-up" },
    { id: 15, name: "Fissatore Trucco in Spray", price: 9.50, description: "Prolunga la durata del make-up proteggendolo dall'umidità.", category: "Make-up" },

    // 4. Men's Grooming
    { id: 16, name: "Olio Barba Ammorbidente", price: 12.50, description: "Idrata la pelle sottostante e disciplina la barba ispida.", category: "Men's Grooming" },
    { id: 17, name: "Crema Viso Anti-Fatica Uomo", price: 13.90, description: "Formula gel fresca che combatte i segni dello stress.", category: "Men's Grooming" },
    { id: 18, name: "Detergente 3-in-1", price: 6.00, description: "Soluzione pratica e veloce per la detersione quotidiana.", category: "Men's Grooming" },
    { id: 19, name: "Gel Modellante Tenuta Forte", price: 5.50, description: "Per look definiti che durano tutto il giorno senza lasciare residui.", category: "Men's Grooming" },
    { id: 20, name: "E-Rasoio di Precisione", price: 22.00, description: "Accessorio per rifinire basette e contorni della barba.", category: "Men's Grooming" }
  ];
  selectedCategory: string = 'Tutti';

  // Questa variabile terrà traccia del prodotto che l'utente clicca
  prodottoSelezionato?: Product;

  // Questa funzione verrà chiamata quando un prodotto verrà cliccato nell'html
  selezionaProdotto(p: Product): void {
    this.prodottoSelezionato = p;
    console.log('Prodotto selezionato:', p.name); // Utile per testare nel terminale/consol
  }

  filtraCategoria(targetCategory: string) {
    this.selectedCategory = targetCategory; 
    this.prodottoSelezionato = undefined;
  }
  
}
