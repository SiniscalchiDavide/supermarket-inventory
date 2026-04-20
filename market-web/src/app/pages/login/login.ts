import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Componente Login: pagina per accedere con email e password
// Usa reactive forms (FormGroup + FormBuilder) per validazione reattiva
@Component({
  selector: 'app-login',                              // Selettore: <app-login></app-login>
  imports: [CommonModule, ReactiveFormsModule, RouterLink],  // Moduli: direttive comuni, form reattivi, routing
  templateUrl: './login.html',                       // Template HTML con form
  styleUrl: './login.css'                            // Stili CSS specifici
})
export class Login {
  // FormGroup reattivo che contiene i controlli email e password
  loginForm: FormGroup;
  
  // Flag che indica se il form è stato già sottomesso (usato per mostrare errori di validazione)
  isSubmitted = false;
  
  // Stringa che contiene il messaggio di errore (es: "Email non trovata", "Password errata")
  errorMessage = '';

  // Costruttore che inizializza il form reattivo con validatori
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Crea il FormGroup con i due controlli email e password
    this.loginForm = this.fb.group({
      // Email: richiesta, deve essere in formato email valido (es: user@example.com)
      email: ['', [Validators.required, Validators.email]],
      // Password: richiesta, minimo 8 caratteri per sicurezza
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Getter per accedere ai controlli del form nel template (usato per mostrare messaggi di validazione)
  // Esempio nel template: f['email']?.hasError('required')
  get f() {
    return this.loginForm.controls;
  }

  // Metodo chiamato quando l'utente invia il form
  onSubmit() {
    // Marca il form come sottomesso (così il template mostra gli errori di validazione)
    this.isSubmitted = true;
    this.errorMessage = '';

    // Verifica che il form sia valido (email e password non vuoti, lunghezza ok, formato email ok)
    if (this.loginForm.valid) {
      // Estrae i valori di email e password dal form
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Chiama il servizio di autenticazione per fare il login
      const result = this.authService.login(email, password);

      if (result.success) {
        // Login riuscito: redirect alla home page per continuare l'esperienza
        this.router.navigate(['/']);
      } else {
        // Login fallito: mostra il messaggio di errore e ripulisce il form
        this.errorMessage = result.error || 'Errore di login';
        this.loginForm.reset();
        this.isSubmitted = false;
      }
    }
  }
}
