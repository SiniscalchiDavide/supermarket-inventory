import { Routes } from '@angular/router';
import { HomeComponent } from './pagina/home/home'; // Importa la tua Home!
import { LoginComponent } from './pagina/login/login'; // Importa la tua Login!
import { RegisterComponent } from './pagina/register/register'; // Importa la tua Register!
import { BeautyCareComponent } from './pagina/beauty-care/beauty-care';
import { FoodPageComponent } from './pagina/food-page/food-page'; // Importa la tua Food Page!
export const routes: Routes = [

  { path: '', component: HomeComponent }, 

  { path: 'food', component: FoodPageComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'Beauty&Care', component: BeautyCareComponent },      // <-- Questo è il "nome" del percorso
  { path: 'register', component: RegisterComponent },  
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
