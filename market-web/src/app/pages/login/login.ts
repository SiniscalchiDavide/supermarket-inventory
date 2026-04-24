import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

// Componente Login: pagina per accedere con email e password
// Usa reactive forms (FormGroup + FormBuilder) per validazione reattiva
@Component({
  selector: 'app-login',                              // Selettore: <app-login></app-login>
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe],  // Moduli: direttive comuni, form reattivi, routing
  templateUrl: './login.html',                       // Template HTML con form
  styleUrl: './login.css'                            // Stili CSS specifici
})
export class Login implements OnInit {
  // FormGroup reattivo che contiene i controlli email e password
  loginForm: FormGroup;
  
  // Flag che indica se il form è stato già sottomesso (usato per mostrare errori di validazione)
  isSubmitted = false;
  
  // Stringa che contiene il messaggio di errore (es: "Email non trovata", "Password errata")
  errorMessage = '';

  // Lista degli account loggati di recente
  recentAccounts: {email: string, firstName: string, lastName: string}[] = [];

  // Flag per mostrare la selezione degli account recenti o il form classico
  showRecentSelection = false;

  // Costruttore che inizializza il form reattivo con validatori
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Crea il FormGroup con i due controlli identificatore e password
    this.loginForm = this.fb.group({
      // Email o Nome: richiesto (abbiamo tolto la validazione Validators.email perché ora accetta anche un nome)
      email: ['', [Validators.required]],
      // Password: richiesta, minimo 8 caratteri per sicurezza
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.loadRecentAccounts();
  }

  // Carica gli account recenti dal servizio
  loadRecentAccounts() {
    this.recentAccounts = this.authService.getRecentAccounts();
    // Mostra la schermata dei recenti solo se ce n'è almeno uno
    if (this.recentAccounts.length > 0) {
      this.showRecentSelection = true;
    }
  }

  // Seleziona un account recente: precompila il form e mostra il campo password
  selectRecentAccount(account: {email: string, firstName: string, lastName: string}) {
    this.loginForm.patchValue({
      email: account.email,
      password: ''
    });
    this.showRecentSelection = false;
    // Focussa automaticamente sul campo password dopo un attimo per dare tempo al DOM di aggiornarsi
    setTimeout(() => {
      document.getElementById('password')?.focus();
    }, 100);
  }

  // Rimuove un account recente dalla lista
  removeRecentAccount(email: string, event: Event) {
    event.stopPropagation(); // Evita di scatenare selectRecentAccount
    this.authService.removeRecentAccount(email);
    this.loadRecentAccounts(); // Ricarica la lista (che potrebbe nascondere la UI se vuota)
  }

  // Torna al form di login manuale
  useAnotherAccount() {
    this.loginForm.reset();
    this.showRecentSelection = false;
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
