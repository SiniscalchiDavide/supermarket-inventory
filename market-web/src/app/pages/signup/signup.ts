import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Componente Signup: pagina per registrare un nuovo account
// Usa reactive forms (FormGroup + FormBuilder) con validatori multipli
@Component({
  selector: 'app-signup',                             // Selettore: <app-signup></app-signup>
  imports: [CommonModule, ReactiveFormsModule, RouterLink],  // Moduli: direttive, form reattivi, routing
  templateUrl: './signup.html',                      // Template HTML con form di registrazione
  styleUrl: './signup.css'                           // Stili CSS specifici
})
export class Signup {
  // FormGroup reattivo che contiene i controlli per: firstName, lastName, email, password, terms
  signupForm: FormGroup;
  
  // Flag che indica se il form è stato sottomesso (usato per mostrare errori di validazione)
  isSubmitted = false;
  
  // Flag di successo per mostrare un messaggio di conferma (opzionale)
  isSuccess = false;
  
  // Stringa che contiene il messaggio di errore (es: "Email già registrata")
  errorMessage = '';

  // Costruttore che inizializza il form reattivo con validatori per ogni campo
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Crea il FormGroup con i cinque controlli
    this.signupForm = this.fb.group({
      // firstName: richiesto, minimo 2 caratteri (nome troppo corto non ammesso)
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      // lastName: richiesto, minimo 2 caratteri (cognome troppo corto non ammesso)
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      // email: richiesta, deve essere in formato valido (user@domain.com)
      email: ['', [Validators.required, Validators.email]],
      // password: richiesta, minimo 8 caratteri per sicurezza
      password: ['', [Validators.required, Validators.minLength(8)]],
      // terms: checkbox che DEVE essere spuntato (true) per procedere
      terms: [false, [Validators.requiredTrue]]
    });
  }

  // Getter per accedere ai controlli del form nel template (scorciatoia)
  // Usato nel template per verificare errori: f['email']?.hasError('email')
  get f() {
    return this.signupForm.controls;
  }

  // Metodo chiamato quando l'utente invia il form di registrazione
  onSubmit() {
    // Marca il form come sottomesso (così il template mostra gli errori di validazione in rosso)
    this.isSubmitted = true;
    this.errorMessage = '';
    
    // Verifica che il form sia valido: tutti i campi richiesti compilati, formato email ok, password abbastanza lunga, terms spuntato
    if (this.signupForm.valid) {
      // Estrae i valori dal form usando destructuring
      const { firstName, lastName, email, password } = this.signupForm.value;

      // Chiama il servizio di autenticazione per registrare il nuovo utente
      const result = this.authService.register(email, password, firstName, lastName);

      if (result.success) {
        // Registrazione riuscita: dopo 800ms naviga alla home per un'esperienza fluida
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 800);
      } else {
        // Registrazione fallita: mostra il messaggio di errore e ripulisce il form
        this.errorMessage = result.error || 'Errore durante la registrazione';
        this.signupForm.reset();
        this.isSubmitted = false;
      }
    }
  }
}