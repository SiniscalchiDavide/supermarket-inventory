import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private router: Router) {}

  vaiAiProdotti() {
    this.router.navigate(['/info']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}