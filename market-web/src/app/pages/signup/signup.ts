import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  // Il form logico che raggruppa tutti i nostri input
  signupForm: FormGroup;
  // Variabile per capire se l'utente ha provato a inviare il form (così mostriamo gli errori rossi)
  isSubmitted = false;
  // Variabile per mostrare il messaggio di successo finale
  isSuccess = false;
  // Messaggio di errore (es. email già registrata)
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Configurazione del form con le regole.
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]], // Deve contenere @ e un dominio
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, [Validators.requiredTrue]] // Il checkbox deve essere per forza true (spuntato)
    });
  }

  // Una piccola funzione "scorciatoia" per non dover scrivere this.signupForm.controls nel file HTML
  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    // Registriamo il tentativo di click
    this.isSubmitted = true;
    this.errorMessage = '';
    
    // Se Angular dice che tutti i controlli sono verdi (validi)
    if (this.signupForm.valid) {
      const { firstName, lastName, email, password } = this.signupForm.value;

      // Tenta la registrazione
      const result = this.authService.register(email, password, firstName, lastName);

      if (result.success) {
        // Registrazione riuscita - vai direttamente alla home
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 800);
      } else {
        // Registrazione fallita (es. email già esiste)
        this.errorMessage = result.error || 'Errore durante la registrazione';
        this.signupForm.reset();
        this.isSubmitted = false;
      }
    }
  }
}