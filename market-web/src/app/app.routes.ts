import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';

// Pagine Sezione Indipendenti (Come se fossero sotto-siti)
import { Alimentari } from './pages/sezione/alimentari/alimentari';
import { Giocattoli } from './pages/sezione/giocattoli/giocattoli';
import { Elettronica } from './pages/sezione/elettronica/elettronica';
import { Beauty } from './pages/sezione/beauty/beauty';
import { Altro } from './pages/sezione/altro/altro';

// Qui configuriamo le "strade" della nostra applicazione.
// Quando l'utente digita un URL nel browser, Angular guarda questa lista 
// per capire quale "Pezzo" (Component) di schermo deve caricare al centro.
export const routes: Routes = [
  { path: '', component: Home }, // Se l'URL è vuoto (es. localhost:4200), carica la Home
  { path: 'info', component: ProductList }, // localhost:4200/info
  { path: 'info/:id', component: ProductDetail }, // Rotta parametrica: "id" è una variabile (es. /info/5)
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  
  // Rotte specifiche per ogni singola sezione del negozio
  { path: 'sezione/alimentari-e-bevande', component: Alimentari },
  { path: 'sezione/giocattoli', component: Giocattoli },
  { path: 'sezione/elettronica', component: Elettronica },
  { path: 'sezione/beauty', component: Beauty },
  { path: 'sezione/altro', component: Altro },
  
  // Questa è una rotta di "fallback" (salvagente). 
  // Se l'utente scrive un URL che non esiste (es. /pippo), Angular lo rimanda alla home ('').
  { path: '**', redirectTo: '' }
];
