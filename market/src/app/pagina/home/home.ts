import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinguaService } from '../../lingua';
// Interfaccia per definire la struttura di una slide
interface Slide {
  imageUrl: string;
  title: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'home.html',
  styleUrls: ['home.css']
})
export class HomeComponent {
// Nel TS della Home:
  constructor(public linguaService: LinguaService) {}
  // Dati per lo slider principale (Hero Carousel)
  slides: Slide[] = [
    { imageUrl: 'https://via.placeholder.com/800x400?text=Offerta+1', title: 'Scopri le offerte' },
    { imageUrl: 'https://via.placeholder.com/800x400?text=Nuovi+Arrivi', title: 'Nuova Collezione' },
    { imageUrl: 'https://via.placeholder.com/800x400?text=Bestseller', title: 'I più venduti' }
  ];

  currentSlideIndex: number = 0; // Indice della slide attualmente visibile

  // Funzione per andare alla slide successiva
  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  // Funzione per andare alla slide precedente
  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }
}