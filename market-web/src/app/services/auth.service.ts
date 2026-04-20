import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Interfaccia che rappresenta un utente del sistema
interface User {
  id: number;           // ID univoco dell'utente
  firstName: string;    // Nome dell'utente
  lastName: string;     // Cognome dell'utente
  email: string;        // Email (username)
  password: string;     // Password in chiaro (non hashata per semplicità)
}

// Servizio singleton per gestire autenticazione e autorizzazione
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Chiavi localStorage per salvare i dati di autenticazione
  private readonly CURRENT_USER_KEY = 'currentUser';    // Utente attualmente loggato
  private readonly ALL_USERS_KEY = 'allUsers';          // Tutti gli utenti registrati

  constructor(private router: Router) {}

  // Registra un nuovo utente: valida email, crea account e fa auto-login
  register(email: string, password: string, firstName: string, lastName: string): { success: boolean; error?: string } {
    // Legge tutti gli utenti dal localStorage
    const allUsers = this.getAllUsers();
    
    // Controlla se l'email è già registrata (evita duplicati)
    if (allUsers.some(user => user.email === email)) {
      return { success: false, error: 'Email già registrata' };
    }

    // Crea il nuovo oggetto utente con ID univoco incrementale
    const newUser: User = {
      id: allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id)) + 1 : 1,
      firstName,
      lastName,
      email,
      password
    };

    // Aggiunge il nuovo utente alla lista e persiste nel localStorage
    allUsers.push(newUser);
    localStorage.setItem(this.ALL_USERS_KEY, JSON.stringify(allUsers));

    // Fa il login automatico dell'utente appena registrato
    this.setCurrentUser(newUser);

    return { success: true };
  }

  // Effettua il login: valida email e password
  login(email: string, password: string): { success: boolean; error?: string } {
    // Recupera la lista di tutti gli utenti registrati
    const allUsers = this.getAllUsers();
    
    // Cerca l'utente per email
    const user = allUsers.find(u => u.email === email);
    
    if (!user) {
      return { success: false, error: 'Email non trovata' };
    }

    // Verifica che la password corrisponda
    if (user.password !== password) {
      return { success: false, error: 'Password errata' };
    }

    // Salva l'utente come correntemente loggato e ritorna successo
    this.setCurrentUser(user);
    return { success: true };
  }

  // Effettua il logout: rimuove l'utente corrente e reindirizza al login
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.router.navigate(['/login']);
  }

  // Verifica se c'è un utente attualmente loggato
  isLoggedIn(): boolean {
    return localStorage.getItem(this.CURRENT_USER_KEY) !== null;
  }

  // Restituisce l'oggetto utente attualmente loggato (o null se nessuno loggato)
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Metodo privato: salva un utente nel localStorage come correntemente loggato
  private setCurrentUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  // Metodo privato: carica e ritorna la lista di tutti gli utenti registrati dal localStorage
  private getAllUsers(): User[] {
    const usersJson = localStorage.getItem(this.ALL_USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }
}
