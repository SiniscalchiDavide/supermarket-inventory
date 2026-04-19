/*
  SUPERMARKET INVENTORY - APPLICAZIONE ANGULAR
  ============================================
  Composizione del Gruppo:
  - Gestione Prodotti e Componenti Principali
  - ProductListComponent: Visualizzazione liste prodotti
  - ProductDetailComponent: Dettagli singolo prodotto
  - Pagine: food-page, beauty-care, home, login, register
  
  Requisiti Implementati:
  ✓ Array di oggetti Product (id, name, price, description, category)
  ✓ Componenti standalone con @Input per props
  ✓ Filtraggio per categoria (*ngFor)
  ✓ Eliminazione prodotti
  ✓ Aggiunta nuovi prodotti tramite form
  ✓ Messaggio quando nessun prodotto è selezionato
  ✓ Stile Liquid Glass (Glassmorphism)
*/

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../app/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('market');
  
}
