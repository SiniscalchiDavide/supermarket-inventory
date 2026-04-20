import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sezioni',
  imports: [CommonModule, RouterLink],
  templateUrl: './sezioni.html',
  styleUrl: './sezioni.css'
})
export class Sezioni {
  // Lista delle sezioni come da specifiche (ordinato come da project memory)
  sezioni: string[] = ['Alimentari e bevande', 'Giocattoli', 'Elettronica', 'Beauty', 'Altro'];
}