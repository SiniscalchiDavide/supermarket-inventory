import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  isSubmitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = '';

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      const result = this.authService.login(email, password);

      if (result.success) {
        // Login riuscito - redirect alla home
        this.router.navigate(['/']);
      } else {
        // Login fallito - mostra errore e cancella i campi
        this.errorMessage = result.error || 'Errore di login';
        this.loginForm.reset();
        this.isSubmitted = false;
      }
    }
  }
}
