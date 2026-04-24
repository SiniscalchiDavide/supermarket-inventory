import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { SidePanelService } from '../../../services/side-panel.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-beauty',
  standalone: true, // Se Kevin usa standalone components
  imports: [CommonModule, TranslatePipe],
  templateUrl: './beauty.html',
  styleUrls: ['./beauty.css']
})
export class Beauty implements OnInit, OnDestroy {
  // Iniezione dei servizi per dati e pannello laterale
  private productService = inject(ProductService);
  private sidePanelService = inject(SidePanelService);

  // Soggetto reattivo per gestire il filtro attuale ('all', 'skincare', 'makeup')
  private filterSubject = new BehaviorSubject<string>('all');
  
  // Observable che emette la lista finale dei prodotti filtrati
  products$!: Observable<Product[]>;

  ngOnInit(): void {
    // Aggiungiamo una classe al body per stili globali specifici della pagina Beauty
    try {
      document.body.classList.add('beauty-mode');
    } catch (e) { /* Fallback per ambienti non-DOM */ }

    // Combiniamo i prodotti del server con il filtro scelto dall'utente
    this.products$ = combineLatest([
      this.productService.products$,
      this.filterSubject.asObservable()
    ]).pipe(
      map(([products, activeFilter]) => {
        // 1. Filtriamo per la sezione principale 'beauty'
        const beautyProducts = products.filter(p => p.section === 'beauty');
        
        // 2. Se il filtro è 'all', mostriamo tutto il reparto beauty
        if (activeFilter === 'all') return beautyProducts;
        
        // 3. Altrimenti filtriamo per la sottosezione specifica (coerente con image_34713a.png)
        return beautyProducts.filter(p => p.subsection === activeFilter);
      })
    );
  }

  // Rimuove la classe speciale quando usciamo dalla pagina
  ngOnDestroy(): void {
    try {
      document.body.classList.remove('beauty-mode');
    } catch (e) { }
  }

  // Apre il dettaglio prodotto (funzionalità di Kevin)
  openPanel(product: Product) {
    this.sidePanelService.openPanel(product);
  }

  // Funzione chiamata dai bottoni nell'HTML per cambiare categoria
  filterBy(category: string): void {
    this.filterSubject.next(category);
  }
}