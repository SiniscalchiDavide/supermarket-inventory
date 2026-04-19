import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LinguaService } from '../../lingua';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginData = {
    username: '', // Qui l'utente scrive l'email o il nome
    password: ''
  };

  constructor(public ls: LinguaService, private router: Router) {}

  accedi() {
    // 1. Prendiamo la lista "users"
    const storageUsers = localStorage.getItem('users');
    const listaUtenti = storageUsers ? JSON.parse(storageUsers) : [];

    // 2. Cerchiamo l'utente che ha la mail (o il nome) e la password uguali
    const trovato = listaUtenti.find((u: any) => {
      return (u.email === this.loginData.username || u.name === this.loginData.username) 
              && u.password === this.loginData.password;
    });

    if (trovato) {
      // 3. Se trovato, salviamo CHI è l'utente attuale in "currentUser"
      localStorage.setItem('currentUser', JSON.stringify(trovato));
      localStorage.setItem('isLogged', 'true');
      
      alert('Login effettuato con successo!');
      this.router.navigate(['/']);
    } else {
      alert('Errore: email o password non corretti!');
    }
  }
}