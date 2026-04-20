import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { SearchStateService } from './services/search-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private searchStateService = inject(SearchStateService);
  isSearchOpen$: Observable<boolean> = this.searchStateService.searchOpen$;

  closeSearch() {
    this.searchStateService.setSearchOpen(false);
  }
}