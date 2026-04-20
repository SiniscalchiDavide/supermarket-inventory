import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { Observable, map } from 'rxjs';

// Componente Alimentari: mostra i prodotti della sezione alimentari e bevande
// Implementa OnInit per caricare i prodotti al caricamento della pagina
@Component({
  selector: 'app-alimentari',                 // Selettore: <app-alimentari></app-alimentari>
  imports: [CommonModule],                   // Importa direttive comuni (*ngFor, *ngIf)
  templateUrl: './alimentari.html',          // Template HTML
  styleUrl: './alimentari.css'               // Stili CSS specifici
})
export class Alimentari implements OnInit {
  // Inietta il servizio globale dei prodotti
  private productService = inject(ProductService);
  
  // Observable che emette un array di prodotti filtrati per questa sezione
  // Il ! (non-null assertion) dice a TypeScript che sarà inizializzato in ngOnInit
  products$!: Observable<Product[]>;

  // Viene eseguito automaticamente quando il componente viene inizializzato
  // Qui carichiamo i prodotti della sezione
  ngOnInit(): void {
    // Si sottoscrive ai prodotti da productService usando la pipe RxJS
    // map() trasforma l'array globale di prodotti in un array filtrato per questa sezione
    // Filter per section === 'alimentari-e-bevande' mantiene solo i prodotti di questo reparto
    this.products$ = this.productService.products$.pipe(
      map(products => products.filter(p => p.section === 'alimentari-e-bevande'))
    );
  }
}