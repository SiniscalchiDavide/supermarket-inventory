import { Injectable } from '@angular/core';
import { Product, ProductService } from './product.service';

// Interfaccia che rappresenta un risultato di ricerca (pagina o prodotto)
export interface SearchResult {
  type: 'page' | 'product';  // Tipo di risultato: pagina navigabile o prodotto del catalogo
  id: number;                // Identificatore univoco
  name: string;              // Nome visualizzato nel dropdown
  description?: string;      // Descrizione opzionale (per prodotti)
  route?: string;            // Route per navigare (per pagine)
}

// Servizio singleton per gestire la ricerca nel sito e nei prodotti
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  // Array statico di tutte le pagine principali del sito (non cambiano mai)
  private pages: SearchResult[] = [
    { type: 'page', id: 1, name: 'Home', route: '/' },
    { type: 'page', id: 2, name: 'Catalogo', route: '/info' },
    { type: 'page', id: 3, name: 'Alimentari', route: '/sezione/alimentari-e-bevande' },
    { type: 'page', id: 4, name: 'Giocattoli', route: '/sezione/giocattoli' },
    { type: 'page', id: 5, name: 'Elettronica', route: '/sezione/elettronica' },
    { type: 'page', id: 6, name: 'Beauty', route: '/sezione/beauty' },
    { type: 'page', id: 7, name: 'Altro', route: '/sezione/altro' }
  ];

  constructor(private productService: ProductService) {}

  // Effettua la ricerca su pagine e prodotti, ritorna risultati combinati
  // Ricerca case-insensitive per nome
  search(query: string): SearchResult[] {
    if (!query || query.trim() === '') {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Filtra le pagine che contengono il testo cercato (case-insensitive)
    const pageResults = this.pages.filter(page =>
      page.name.toLowerCase().includes(lowerQuery)
    );
    results.push(...pageResults);

    // Filtra i prodotti che corrispondono al nome cercato
    // NON ricerca nella descrizione per evitare troppe corrispondenze
    const products = this.productService.getProducts();
    const productResults = products
      .map(product => ({
        type: 'product' as const,
        id: product.id,
        name: product.name,
        description: product.description,
        route: `/sezione/${product.section}`
      }))
      .filter(product =>
        product.name.toLowerCase().includes(lowerQuery)
      );

    // Combina pagine e prodotti e ritorna
    results.push(...productResults);
    return results;
  }

  // Divide i risultati in pagine: estrae "pageSize" risultati da pagina "page"
  // Esempio: pagina 0 = risultati 0-4, pagina 1 = risultati 5-9, etc.
  paginateResults(results: SearchResult[], page: number, pageSize: number = 5): SearchResult[] {
    const start = page * pageSize;
    return results.slice(start, start + pageSize);
  }

  // Calcola il numero totale di pagine dato il numero di risultati
  // Usa Math.ceil per arrotondare verso l'alto (es: 7 risultati con pageSize 5 = 2 pagine)
  getTotalPages(totalResults: number, pageSize: number = 5): number {
    return Math.ceil(totalResults / pageSize);
  }
}
