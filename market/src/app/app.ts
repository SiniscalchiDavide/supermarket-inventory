/*
  SUPERMARKET INVENTORY - APPLICAZIONE ANGULAR
  ============================================
  Composizione del Gruppo:
  - Gestione Prodotti e Componenti Principali
  - ProductListComponent: Visualizzazione liste prodotti
  - ProductDetailComponent: Dettagli singolo prodotto
  - Pagine: food-page, beauty-care, home, login, register
  
  SISTEMA DI TRADUZIONE MULTILINGUE:
  - Lingue supportate: Italiano, English, 中文, Tagalog
  - Persistenza della lingua in localStorage
  - Integrazione con LinguaService
  
  SISTEMA DI TEMA (Light/Dark):
  - Toggle tema nella navbar
  - Persistenza in localStorage
  - Liquid Glass applicato in entrambi i temi
  
  Requisiti Implementati:
  ✓ Array di oggetti Product (id, name, price, description, category)
  ✓ Componenti standalone con @Input per props
  ✓ Filtraggio per categoria (*ngFor)
  ✓ Eliminazione prodotti
  ✓ Aggiunta nuovi prodotti tramite form
  ✓ Messaggio quando nessun prodotto è selezionato
  ✓ Stile Liquid Glass (Glassmorphism) - Light & Dark
  ✓ Traduzione multilingue tutto il sito
  ✓ Tema dinamico globale
*/

import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../app/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('market');
  
  ngOnInit() {
    // Carica il tema salvato al caricamento della pagina
    const temaScuro = localStorage.getItem('darkMode') === 'true';\n    if (temaScuro) {\n      document.body.classList.add('dark-mode');\n    }\n  }\n}
