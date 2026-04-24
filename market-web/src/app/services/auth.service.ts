import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Interfaccia che rappresenta un utente del sistema
interface User {
  id: number;           // ID univoco dell'utente
  firstName: string;    // Nome dell'utente
  lastName: string;     // Cognome dell'utente
  email: string;        // Email (username)
  password: string;     // Password in chiaro
}

// Servizio singleton per gestire autenticazione e autorizzazione
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Chiavi localStorage per salvare i dati di autenticazione
  private readonly CURRENT_USER_KEY = 'currentUser';    // Utente attualmente loggato
  private readonly ALL_USERS_KEY = 'allUsers';          // Tutti gli utenti registrati

  constructor(private router: Router) {
    this.initializeDefaultAdmin();
  }

  // Inizializza l'account admin predefinito se non esiste o aggiorna l'hash se necessario
  private initializeDefaultAdmin() {
    const allUsers = this.getAllUsers();
    const adminIndex = allUsers.findIndex(u => u.email === 'admin@gmail.com');
    const expectedPassword = 'admin123';

    if (adminIndex === -1) {
      const adminUser: User = {
        id: 0,
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@gmail.com',
        password: expectedPassword
      };
      allUsers.push(adminUser);
      localStorage.setItem(this.ALL_USERS_KEY, JSON.stringify(allUsers));
    } else if (allUsers[adminIndex].password !== expectedPassword) {
      // Forza l'aggiornamento della password alla versione in chiaro
      allUsers[adminIndex].password = expectedPassword;
      localStorage.setItem(this.ALL_USERS_KEY, JSON.stringify(allUsers));
    }
  }

  // Registra un nuovo utente: valida email, crea account e fa auto-login
  register(email: string, password: string, firstName: string, lastName: string): { success: boolean; error?: string } {
    // Validazione base dei dati
    if (!email || !email.includes('@') || !password || password.length < 8 || !firstName || !lastName) {
      return { success: false, error: 'Dati non validi' };
    }

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
      password: password
    };

    // Aggiunge il nuovo utente alla lista e persiste nel localStorage
    allUsers.push(newUser);
    localStorage.setItem(this.ALL_USERS_KEY, JSON.stringify(allUsers));

    // Fa il login automatico dell'utente appena registrato
    this.setCurrentUser(newUser);

    return { success: true };
  }

  // Effettua il login: valida email/nome e password
  login(identifier: string, password: string): { success: boolean; error?: string } {
    // Recupera la lista di tutti gli utenti registrati
    const allUsers = this.getAllUsers();
    
    // Cerca l'utente per email oppure per nome (firstName) in modo case-insensitive
    const user = allUsers.find(u => 
      u.email.toLowerCase() === identifier.toLowerCase() || 
      u.firstName.toLowerCase() === identifier.toLowerCase()
    );
    
    if (!user) {
      return { success: false, error: 'Utente non trovato' };
    }

    // Verifica che la password corrisponda (in chiaro)
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

  // Verifica se l'utente loggato è admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.email === 'admin@gmail.com';
  }

  // Restituisce l'oggetto utente attualmente loggato (o null se nessuno loggato)
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Metodo privato: salva un utente nel localStorage come correntemente loggato
  // e lo aggiunge alla lista degli account recenti
  private setCurrentUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    this.addRecentAccount(user);
  }

  // Aggiunge l'utente agli accessi recenti (massimo 3), spostandolo in cima se già presente
  private addRecentAccount(user: User): void {
    // Estraiamo solo le informazioni necessarie per la UI (no password)
    const recentInfo = { email: user.email, firstName: user.firstName, lastName: user.lastName };
    
    let recents = this.getRecentAccounts();
    // Rimuove l'utente se era già in lista (per spostarlo poi in cima)
    recents = recents.filter(u => u.email !== user.email);
    // Aggiunge in cima
    recents.unshift(recentInfo);
    // Tiene solo gli ultimi 3 accessi
    if (recents.length > 3) {
      recents = recents.slice(0, 3);
    }
    
    localStorage.setItem('recentAccounts', JSON.stringify(recents));
  }

  // Restituisce la lista degli account loggati di recente (senza password)
  getRecentAccounts(): {email: string, firstName: string, lastName: string}[] {
    const recentsJson = localStorage.getItem('recentAccounts');
    return recentsJson ? JSON.parse(recentsJson) : [];
  }

  // Rimuove un account dalla cronologia recente
  removeRecentAccount(email: string): void {
    let recents = this.getRecentAccounts();
    recents = recents.filter(u => u.email !== email);
    localStorage.setItem('recentAccounts', JSON.stringify(recents));
  }

  // Metodo privato: carica e ritorna la lista di tutti gli utenti registrati dal localStorage
  private getAllUsers(): User[] {
    const usersJson = localStorage.getItem(this.ALL_USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }
}
