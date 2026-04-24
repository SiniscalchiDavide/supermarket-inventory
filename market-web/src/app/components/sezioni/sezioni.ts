import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

// Componente Sezioni: mostra le categorie principali di prodotti
// Usato nella home page per navigare alle diverse sezioni del negozio
@Component({
  selector: 'app-sezioni',                    // Selettore: <app-sezioni></app-sezioni>
  imports: [CommonModule, RouterLink, TranslatePipe],       // Importa direttive comuni (*ngFor, [routerLink])
  templateUrl: './sezioni.html',             // Template HTML
  styleUrl: './sezioni.css'                  // Stili CSS specifici del componente
})
export class Sezioni {
  // Array di categorie di prodotti: usato nel template con *ngFor per visualizzare i link
  // Mantenuta l'ordinanza richiesta dalle specifiche del progetto
  sezioni: string[] = [
    'Alimentari e bevande',  // Categoria 1: cibi e bevande
    'Giocattoli',            // Categoria 2: giochi
    'Elettronica',           // Categoria 3: dispositivi elettronici
    'Beauty',                // Categoria 4: prodotti di bellezza
    'Altro'                  // Categoria 5: altri prodotti
  ];
}