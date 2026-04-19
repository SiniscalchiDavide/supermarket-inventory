import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LinguaService } from '../../lingua';

// IMPORTIAMO IL JSON DEI PAESI DIRETTAMENTE
import countriesData from './countries.json';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
  
  formData = {
    name: '',
    cognome: '',
    email: '',
    birthdate: '',
    gender: '',
    country: '',
    password: '',
    conpassword: '',
    terms: false
  };

  paesi: string[] = [];

  constructor(public ls: LinguaService, private router: Router) {}

  ngOnInit() {
    // Carica i paesi all'avvio
    this.paesi = (countriesData as any[]).map(c => c.it || c.en).sort();
  }

  conferma() {
    // --- 1. CONTROLLO DEI CAMPI MANCANTI ---
    let campiMancanti: string[] = [];

    // Usiamo .trim() per evitare che l'utente metta solo degli spazi vuoti
    if (!this.formData.name.trim()) campiMancanti.push('Nome');
    if (!this.formData.cognome.trim()) campiMancanti.push('Cognome');
    if (!this.formData.email.trim()) campiMancanti.push('Email');
    if (!this.formData.birthdate) campiMancanti.push('Data di nascita');
    if (!this.formData.gender) campiMancanti.push('Genere');
    if (!this.formData.country) campiMancanti.push('Paese di provenienza');
    if (!this.formData.password) campiMancanti.push('Password');
    if (!this.formData.conpassword) campiMancanti.push('Conferma Password');
    if (!this.formData.terms) campiMancanti.push('Termini e condizioni');

    // Se l'array contiene almeno un errore, mostriamo l'alert e ci fermiamo
    if (campiMancanti.length > 0) {
      alert("Attenzione! Compila i seguenti campi mancanti:\n\n- " + campiMancanti.join('\n- '));
      return; // <-- FONDAMENTALE: blocca la creazione dell'account
    }

    // --- 2. CONTROLLO PASSWORD COINCIDENTI ---
    if (this.formData.password !== this.formData.conpassword) {
      alert('Le password non coincidono!');
      return;
    }

    // --- 3. LETTURA LISTA E CONTROLLO EMAIL ESISTENTE ---
    const storageUsers = localStorage.getItem('users');
    let listaUtenti = storageUsers ? JSON.parse(storageUsers) : [];

    const esisteGia = listaUtenti.find((u: any) => u.email === this.formData.email);
    if (esisteGia) {
      alert('Questa email è già registrata!');
      return;
    }

    // --- 4. SALVATAGGIO NELLA LISTA UTENTI ---
    const nuovoUtente = { ...this.formData };
    listaUtenti.push(nuovoUtente);
    localStorage.setItem('users', JSON.stringify(listaUtenti));

    // --- 5. LOGICA DI AUTO-LOGIN ---
    localStorage.setItem('currentUser', JSON.stringify(nuovoUtente));
    localStorage.setItem('isLogged', 'true');

    alert('Account creato! Accesso effettuato in automatico.');
    
    // Mandiamo l'utente alla Home
    this.router.navigate(['/']); 
  }
}