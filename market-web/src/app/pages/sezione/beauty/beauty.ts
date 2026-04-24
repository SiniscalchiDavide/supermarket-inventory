import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { SidePanelService } from '../../../services/side-panel.service';
import { Observable, map } from 'rxjs';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { BehaviorSubject, combineLatest } from 'rxjs';

// Componente Beauty: mostra i prodotti della sezione Beauty (prodotti di bellezza)
// Implementa OnInit per caricare i prodotti al caricamento della pagina
@Component({
  selector: 'app-beauty',                     // Selettore: <app-beauty></app-beauty>
  imports: [CommonModule, TranslatePipe],                   // Importa direttive comuni (*ngFor, *ngIf)
  templateUrl: './beauty.html',              // Template HTML
  styleUrl: './beauty.css'                   // Stili CSS specifici
})
export class Beauty implements OnInit {
  // Inietta il servizio prodotti: qui arrivano tutti i prodotti dal localStorage
  private productService = inject(ProductService);
  private sidePanelService = inject(SidePanelService);

  // AGGIUNTA: Un "Subject" per gestire il filtro attivo (inizialmente 'all')
  private filterSubject = new BehaviorSubject<string>('all');
  
  // Observable che emette un array di prodotti filtrati per questa sezione
  // Il ! indica che sarà inizializzato in ngOnInit
  products$!: Observable<Product[]>;

  // Viene eseguito automaticamente quando il componente viene inizializzato
  ngOnInit(): void {
    // Usiamo combineLatest per unire i prodotti con il filtro scelto
    this.products$ = combineLatest([
      this.productService.products$,
      this.filterSubject.asObservable()
    ]).pipe(
      map(([products, activeFilter]) => {
        // Prima filtriamo per sezione 'beauty'
        const beautyProducts = products.filter(p => p.section === 'beauty');
        
        // Poi applichiamo la sottosezione se non è 'all'
        if (activeFilter === 'all') return beautyProducts;
        return beautyProducts.filter(p => p.subsection === activeFilter);
      })
    );
  }

  openPanel(product: Product) {
    this.sidePanelService.openPanel(product);
  }

  // AGGIUNTA: La funzione che mancava e che risolve gli errori nell'HTML
  filterBy(category: string): void {
    this.filterSubject.next(category);
  }
}