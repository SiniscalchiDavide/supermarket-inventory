import { Component, inject, OnInit, DestroyRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Sezioni } from '../sezioni/sezioni';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { SearchService, SearchResult } from '../../services/search.service';
import { SearchStateService } from '../../services/search-state.service';
import { FormsModule } from '@angular/forms';

// Componente navbar con ricerca, login, tema e navigazione principale
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, Sezioni, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  // Riferimento al campo input per gestire il focus automatico
  @ViewChild('searchInput') searchInput?: ElementRef;

  // Iniezione di servizi
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  searchService = inject(SearchService);
  searchStateService = inject(SearchStateService);
  router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // Query di ricerca digitata dall'utente
  searchQuery = '';
  
  // Risultati totali della ricerca (prima pagina + altre)
  searchResults: SearchResult[] = [];
  
  // Risultati attualmente visualizzati nel dropdown
  displayedResults: SearchResult[] = [];
  
  // Numero di pagina attuale per la paginazione
  currentPage = 0;
  
  // Numero di risultati per pagina
  pageSize = 5;
  
  // Indica se la barra di ricerca è aperta
  isSearchOpen = false;

  // Inizializza il componente: ascolta i cambiamenti dello stato di ricerca globale
  ngOnInit() {
    this.searchStateService.searchOpen$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isOpen) => {
        this.isSearchOpen = isOpen;
        // Se la ricerca viene chiusa, resetta il dropdown e pulisci i dati
        if (!isOpen) {
          this.searchQuery = '';
          this.searchResults = [];
          this.displayedResults = [];
          this.currentPage = 0;
        }
      });
  }

  // Attiva/disattiva il tema scuro/chiaro
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // Restituisce true se il tema attuale è scuro
  isDarkTheme(): boolean {
    return this.themeService.isDarkMode();
  }

  // Scrolla la pagina verso l'alto in modo fluido
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Restituisce true se l'utente è autenticato
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Effettua il logout dell'utente corrente
  logout() {
    this.authService.logout();
  }

  // Restituisce il nome completo dell'utente autenticato
  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.firstName + ' ' + user.lastName : '';
  }

  // Apre la barra di ricerca e mette il focus automaticamente nell'input
  openSearch() {
    this.isSearchOpen = true;
    this.searchStateService.setSearchOpen(true);
    // setTimeout garantisce che l'elemento è renderizzato prima del focus
    setTimeout(() => {
      this.searchInput?.nativeElement.focus();
    }, 0);
  }

  // Chiude la barra di ricerca e resetta tutti i dati
  closeSearch() {
    this.isSearchOpen = false;
    this.searchStateService.setSearchOpen(false);
    this.searchQuery = '';
    this.searchResults = [];
    this.displayedResults = [];
    this.currentPage = 0;
  }

  // Esegue la ricerca in tempo reale mentre l'utente digita
  onSearchInput() {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
      this.displayedResults = [];
      this.currentPage = 0;
      return;
    }

    // Cerca nel servizio per pagine e prodotti
    this.searchResults = this.searchService.search(this.searchQuery);
    this.currentPage = 0;
    this.updateDisplayedResults();
  }

  // Aggiorna la lista di risultati visualizzati per la pagina corrente
  private updateDisplayedResults() {
    this.displayedResults = this.searchService.paginateResults(
      this.searchResults,
      this.currentPage,
      this.pageSize
    );
  }

  // Carica la pagina successiva di risultati (accumula, non sostituisce)
  loadMore() {
    this.currentPage++;
    const newResults = this.searchService.paginateResults(
      this.searchResults,
      this.currentPage,
      this.pageSize
    );
    // Usa lo spread operator per concatenare i risultati
    this.displayedResults = [...this.displayedResults, ...newResults];
  }

  // Verifica se ci sono altri risultati da mostrare oltre quelli attuali
  hasMoreResults(): boolean {
    const totalPages = this.searchService.getTotalPages(this.searchResults.length, this.pageSize);
    return this.currentPage + 1 < totalPages;
  }

  // Naviga verso il risultato selezionato (pagina o prodotto nel catalogo)
  selectResult(result: SearchResult) {
    if (result.type === 'page') {
      // Naviga direttamente alla pagina
      this.router.navigate([result.route]);
    } else if (result.type === 'product') {
      // Naviga al catalogo con queryParams per selezionare e scrollare il prodotto
      this.router.navigate(['/info'], { queryParams: { productId: result.id, scroll: 'true' } });
    }
    // Chiude la barra di ricerca dopo la navigazione
    this.closeSearch();
  }
}