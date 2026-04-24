import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

// Componente Beauty: mostra i prodotti della sezione Beauty (prodotti di bellezza)
// Implementa OnInit per caricare i prodotti al caricamento della pagina
@Component({
  selector: 'app-beauty',                     // Selettore: <app-beauty></app-beauty>
  imports: [CommonModule],                   // Importa direttive comuni (*ngFor, *ngIf)
  templateUrl: './beauty.html',              // Template HTML
  styleUrl: './beauty.css'                   // Stili CSS specifici
})
export class Beauty implements OnInit {
  // Inietta il servizio prodotti: qui arrivano tutti i prodotti dal localStorage
  private productService = inject(ProductService);

  // AGGIUNTA: Un "Subject" per gestire il filtro attivo (inizialmente 'all')
  private filterSubject = new BehaviorSubject<string>('all');
  
  // Observable che emette un array di prodotti filtrati per questa sezione
  // Il ! indica che sarà inizializzato in ngOnInit
  products$!: Observable<Product[]>;

  // Viene eseguito automaticamente prima che il template HTML venga renderizzato
  ngOnInit(): void {
    // MODIFICA: Usiamo combineLatest per unire i prodotti con il filtro scelto
    this.products$ = combineLatest([
      this.productService.products$,
      this.filterSubject.asObservable()
    ]).pipe(
      map(([products, activeFilter]) => {
        // Prima filtriamo per sezione 'beauty' (logica originale di Kevin)
        const beautyProducts = products.filter(p => p.section === 'beauty');
        
        // Poi applichiamo la sottosezione se non è 'all'
        if (activeFilter === 'all') return beautyProducts;
        return beautyProducts.filter(p => p.subsection === activeFilter);
      })
    );
  }

  // AGGIUNTA: La funzione che mancava e che risolve gli errori nell'HTML
  filterBy(category: string): void {
    this.filterSubject.next(category);
  }
}