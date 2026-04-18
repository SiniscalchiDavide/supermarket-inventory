import { Routes } from '@angular/router';
import { HomeComponent } from './pagina/home/home'; // Importa la tua Home!
import { LoginComponent } from './pagina/login/login'; // Importa la tua Login!
import { RegisterComponent } from './pagina/register/register'; // Importa la tua Register!

export const routes: Routes = [

  { path: '', component: HomeComponent }, 


  { 
    path: 'login', component: LoginComponent },       // <-- Questo è il "nome" del percorso
  { path: 'register', component: RegisterComponent },  
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
