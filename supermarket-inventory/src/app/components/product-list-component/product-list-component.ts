/*
  PRODUCT LIST COMPONENT
  ======================
  Componente responsabile di:
  - Visualizzazione lista dei prodotti con *ngFor
  - Filtraggio per categoria
  - Eliminazione prodotti (delete button)
  - Aggiunta nuovi prodotti tramite form
  - Selezione prodotto per mostrare i dettagli
  
  Props @Input:
  - titolo: titolo della sezione
  - categorie: array di categorie disponibili
  - prodotti: array di Product da visualizzare
  - coloreTema: colore del tema principale
  - coloreSfondo: colore di sfondo
*/

import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../product';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { ProductDetailComponent } from '../product-detail-component/product-detail-component';
import { LinguaService } from '../../lingua';

@Component({
  selector: 'app-product-list-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductDetailComponent], 
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.css',
})
export class ProductListComponent implements OnInit {
// --- INGRESSI DATI DALLE PAGINE ESTERNE ---
  @Input() titolo: string = 'Reparto';
  @Input() categorie: string[] = []; 
  @Input() prodotti: Product[] = [];
  
  // NUOVI INGRESSI PER I COLORI!
  @Input() coloreTema: string = '#e84898';   // Colore principale (testi, bordi, bottoni)
  @Input() coloreSfondo: string = '#fff0f5';
  
  // Variabili di stato interne
  selectedCategory: string = 'Tutti';
  prodottoSelezionato?: Product;

  // Modello per l'aggiunta
  nuovoProdotto: Product = { id: 0, name: '', price: 0, description: '', category: '' };

  constructor(public ls: LinguaService) {}

  ngOnInit() {
    // All'avvio, imposta la prima categoria disponibile per il modulo di aggiunta
    if (this.categorie.length > 0) {
      this.nuovoProdotto.category = this.categorie[0];
    }
  }

  // Mappa dei nomi prodotto alle chiavi di traduzione
  private produttTraduzioniMap: { [key: string]: string } = {
    'Pasta Integrale 500g': 'prod_pasta',
    'Riso Basmati': 'prod_riso',
    'Passata di Pomodoro': 'prod_passata',
    'Yogurt Greco Bianco': 'prod_yogurt',
    'Mozzarella di Bufala': 'prod_mozzarella',
    'Biscotti alla Nocciola': 'prod_biscotti',
    'Cioccolato Fondente 85%': 'prod_cioccolato',
    'Succo di Mela Bio': 'prod_succo',
    'Tè Verde Matcha': 'prod_matcha',
    'Gel Detergente Purificante': 'prod_gel',
    'Tonico Illuminante AHA': 'prod_tonico',
    'Shampoo Protettivo Colore': 'prod_shampoo',
    'Fondotinta Fluido Idratante': 'prod_fondotinta',
    'Olio Barba Ammorbidente': 'prod_olio_barba'
  };

  // Funzione per tradurre il nome del prodotto
  tradurciNomeProdotto(nomeProdotto: string): string {
    const chiaveTraduzione = this.produttTraduzioniMap[nomeProdotto];
    if (chiaveTraduzione) {
      return this.ls.getTesto(chiaveTraduzione);
    }
    return nomeProdotto;
  }

  // Funzione per tradurre la descrizione del prodotto
  tradurciDescrizioneProdotto(nomeProdotto: string): string {
    const chiaveTraduzione = this.produttTraduzioniMap[nomeProdotto];
    if (chiaveTraduzione) {
      return this.ls.getTesto(chiaveTraduzione + '_desc');
    }
    return '';
  }

  selezionaProdotto(p: Product): void {
    this.prodottoSelezionato = p;
  }

  filtraCategoria(targetCategory: string) {
    this.selectedCategory = targetCategory; 
    this.prodottoSelezionato = undefined; // deseleziona i dettagli
    
    // Aggiorna la categoria di default nel modulo di aggiunta
    if (targetCategory !== 'Tutti') {
      this.nuovoProdotto.category = targetCategory;
    } else if (this.categorie.length > 0) {
      this.nuovoProdotto.category = this.categorie[0];
    }
  }

  eliminaProdotto(id: number) {
    this.prodotti = this.prodotti.filter(p => p.id !== id);
    if (this.prodottoSelezionato?.id === id) {
      this.prodottoSelezionato = undefined;
    }
  }

  aggiungiProdotto() {
    if (this.nuovoProdotto.name && this.nuovoProdotto.price > 0 && this.nuovoProdotto.description) {
      const prodottoDaAggiungere: Product = { 
        ...this.nuovoProdotto, 
        id: Date.now() 
      };
      
      this.prodotti.push(prodottoDaAggiungere);
      
      // Resetta i campi del form
      this.nuovoProdotto = { 
        id: 0, name: '', price: 0, description: '', 
        category: this.selectedCategory === 'Tutti' ? this.categorie[0] : this.selectedCategory 
      };
    } else {
      alert("Compila Nome, Prezzo e Descrizione per aggiungere il prodotto.");
    }
  }
}