import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly CURRENT_USER_KEY = 'currentUser';
  private readonly ALL_USERS_KEY = 'allUsers';

  constructor(private router: Router) {}

  // Registrazione: crea account e fa login automatico
  register(email: string, password: string, firstName: string, lastName: string): { success: boolean; error?: string } {
    // Controlla se l'email esiste già
    const allUsers = this.getAllUsers();
    if (allUsers.some(user => user.email === email)) {
      return { success: false, error: 'Email già registrata' };
    }

    // Crea il nuovo utente
    const newUser: User = {
      id: allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id)) + 1 : 1,
      firstName,
      lastName,
      email,
      password
    };

    // Salva nella lista di tutti gli utenti
    allUsers.push(newUser);
    localStorage.setItem(this.ALL_USERS_KEY, JSON.stringify(allUsers));

    // Fa login automatico
    this.setCurrentUser(newUser);

    return { success: true };
  }

  // Login: verifica email e password
  login(email: string, password: string): { success: boolean; error?: string } {
    const allUsers = this.getAllUsers();
    
    // Cerca l'utente per email
    const user = allUsers.find(u => u.email === email);
    
    if (!user) {
      return { success: false, error: 'Email non trovata' };
    }

    // Verifica la password
    if (user.password !== password) {
      return { success: false, error: 'Password errata' };
    }

    // Fa login
    this.setCurrentUser(user);
    return { success: true };
  }

  // Logout: cancella l'utente corrente
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.router.navigate(['/login']);
  }

  // Verifica se l'utente è loggato
  isLoggedIn(): boolean {
    return localStorage.getItem(this.CURRENT_USER_KEY) !== null;
  }

  // Ottiene l'utente attualmente loggato
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Metodo privato: salva l'utente loggato
  private setCurrentUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  // Metodo privato: ottiene tutti gli utenti registrati
  private getAllUsers(): User[] {
    const usersJson = localStorage.getItem(this.ALL_USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }
}
