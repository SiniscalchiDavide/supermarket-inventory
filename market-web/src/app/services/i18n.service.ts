import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Tipo per identificare le lingue supportate dall'applicazione
export type Lang = 'it' | 'en';

// Dizionario statico contenente tutte le traduzioni suddivise per lingua ('it' e 'en')
// Utilizzato dal TranslatePipe per mostrare il testo corretto nella UI
export const DICTIONARY: Record<Lang, Record<string, string>> = {
  it: {
    'NAV.CATALOG': 'Catalogo',
    'NAV.SEARCH': 'Cerca pagine o prodotti...',
    'NAV.LOGIN': 'Accedi / Registrati',
    'NAV.LOGOUT': 'Esci',
    'NAV.NO_RESULTS': 'Nessun risultato trovato per',
    'HOME.TITLE': 'Benvenuto in Market',
    'HOME.SUBTITLE': 'Scopri i nostri prodotti',
    'MODAL.CLOSE': 'Chiudi',
    'SECTION.EMPTY': 'Nessun prodotto trovato',
    'SECTION.EMPTY_DESC': 'L\'elenco dei prodotti per questa sezione è attualmente vuoto.',
    'PRODUCT.QTY': 'Qtà:',
    'PRODUCT.DESC': 'Descrizione:',
    'PRODUCT.SPECS': 'Specifiche Tecniche',
    'PRODUCT.CAT': 'Categoria:',
    'PRODUCT.AVAIL': 'Quantità disponibile:',
    'FOOTER.CREDITS': 'Crediti: NyxKy, Alexandra, Davide, Viju',

    'GUARD.DENIED_TITLE': 'Accesso Negato',
    'GUARD.DENIED_MSG': 'Devi accedere o creare un account per continuare.',

    'SECTIONS.TITLE': 'Sezioni',
    'SECTIONS.ALIMENTARI': 'Alimentari e Bevande',
    'SECTIONS.ALIMENTARI_DESC': 'Esplora tutti i prodotti della categoria Alimentari e Bevande',
    'SECTIONS.GIOCATTOLI': 'Giocattoli',
    'SECTIONS.GIOCATTOLI_DESC': 'Esplora tutti i prodotti della categoria Giocattoli',
    'SECTIONS.ELETTRONICA': 'Elettronica',
    'SECTIONS.ELETTRONICA_DESC': 'Esplora tutti i prodotti della categoria Elettronica',
    'SECTIONS.BEAUTY': 'Beauty e Cura Personale',
    'SECTIONS.BEAUTY_DESC': 'Esplora tutti i prodotti della categoria Beauty',
    'SECTIONS.ALTRO': 'Altro',
    'SECTIONS.ALTRO_DESC': 'Esplora tutti i prodotti della categoria Altro',

    'LOGIN.TITLE': 'Accedi a Market',
    'LOGIN.SUBTITLE': 'Inserisci le tue credenziali per continuare',
    'LOGIN.EMAIL': 'Email o Nome',
    'LOGIN.EMAIL_PH': 'Es: utente@gmail.com oppure mario',
    'LOGIN.EMAIL_REQ': 'L\'email o il nome è obbligatorio',
    'LOGIN.EMAIL_INV': 'Inserisci un indirizzo email valido',
    'LOGIN.PWD': 'Password',
    'LOGIN.PWD_PH': 'Inserisci password',
    'LOGIN.PWD_REQ': 'La password è obbligatoria',
    'LOGIN.PWD_MIN': 'La password deve avere almeno 8 caratteri',
    'LOGIN.FORGOT': 'Hai dimenticato la password?',
    'LOGIN.BTN': 'Accedi',
    'LOGIN.NO_ACCOUNT': 'Non hai un account?',
    'LOGIN.SIGNUP_NOW': 'Registrati ora',
    'LOGIN.RECENT_TITLE': 'Accessi Recenti',
    'LOGIN.RECENT_USE': 'Usa un altro account',

    'SIGNUP.TITLE': 'Crea Account',
    'SIGNUP.SUBTITLE': 'Unisciti a Market in pochi semplici passi',
    'SIGNUP.SUCCESS_TITLE': 'Registrazione completata!',
    'SIGNUP.SUCCESS_DESC': 'Il tuo account è stato creato con successo. Reindirizzamento in corso...',
    'SIGNUP.FIRST_NAME': 'Nome',
    'SIGNUP.FIRST_NAME_PH': 'Es. Mario',
    'SIGNUP.FIRST_NAME_REQ': 'Il nome è obbligatorio',
    'SIGNUP.FIRST_NAME_MIN': 'Il nome deve avere almeno 2 caratteri',
    'SIGNUP.LAST_NAME': 'Cognome',
    'SIGNUP.LAST_NAME_PH': 'Es. Rossi',
    'SIGNUP.LAST_NAME_REQ': 'Il cognome è obbligatorio',
    'SIGNUP.LAST_NAME_MIN': 'Il cognome deve avere almeno 2 caratteri',
    'SIGNUP.TERMS': 'Accetto i Termini di servizio e la Privacy Policy',
    'SIGNUP.TERMS_REQ': 'Devi accettare i termini per registrarti',
    'SIGNUP.BTN': 'Crea Account',
    'SIGNUP.HAVE_ACCOUNT': 'Hai già un account?',
    'SIGNUP.LOGIN_NOW': 'Accedi',
    'SIGNUP.GO_LOGIN': 'Vai al Login',

    'CATALOG.TITLE': 'Lista Prodotti',
    'CATALOG.ADD_TITLE': 'Aggiungi Nuovo Prodotto',
    'CATALOG.NAME': 'Nome Prodotto',
    'CATALOG.NAME_REQ': 'Nome obbligatorio (min 3 caratteri).',
    'CATALOG.PRICE': 'Prezzo (€)',
    'CATALOG.PRICE_REQ': 'Prezzo obbligatorio (min 0.01€).',
    'CATALOG.DESC': 'Descrizione',
    'CATALOG.DESC_REQ': 'Descrizione obbligatoria (min 10 caratteri).',
    'CATALOG.SECTION': 'Sezione',
    'CATALOG.SECTION_SELECT': 'Scegli una sezione...',
    'CATALOG.SECTION_REQ': 'Seleziona una sezione.',
    'CATALOG.QTY': 'Quantità Iniziale',
    'CATALOG.BTN': 'Aggiungi Prodotto',
    'CATALOG.NO_PRODUCTS': 'Nessun prodotto disponibile nella lista.',

    'DETAIL.SELECT': 'Clicca su un prodotto nella lista per vederne i dettagli.',
    'DETAIL.NO_SELECTION': 'Nessun prodotto selezionato',
    'DETAIL.DELETE': 'Elimina Prodotto'
  },
  en: {
    'NAV.CATALOG': 'Catalog',
    'NAV.SEARCH': 'Search pages or products...',
    'NAV.LOGIN': 'Login / Sign Up',
    'NAV.LOGOUT': 'Logout',
    'NAV.NO_RESULTS': 'No results found for',
    'HOME.TITLE': 'Welcome to Market',
    'HOME.SUBTITLE': 'Discover our products',
    'MODAL.CLOSE': 'Close',
    'SECTION.EMPTY': 'No products found',
    'SECTION.EMPTY_DESC': 'The product list for this section is currently empty.',
    'PRODUCT.QTY': 'Qty:',
    'PRODUCT.DESC': 'Description:',
    'PRODUCT.SPECS': 'Technical Specs',
    'PRODUCT.CAT': 'Category:',
    'PRODUCT.AVAIL': 'Available quantity:',
    'FOOTER.CREDITS': 'Credits: NyxKy, Alexandra, Davide, Viju',

    'GUARD.DENIED_TITLE': 'Access Denied',
    'GUARD.DENIED_MSG': 'You must login or create an account to continue.',

    'SECTIONS.TITLE': 'Sections',
    'SECTIONS.ALIMENTARI': 'Food & Beverages',
    'SECTIONS.ALIMENTARI_DESC': 'Explore all products in the Food & Beverages category',
    'SECTIONS.GIOCATTOLI': 'Toys',
    'SECTIONS.GIOCATTOLI_DESC': 'Explore all products in the Toys category',
    'SECTIONS.ELETTRONICA': 'Electronics',
    'SECTIONS.ELETTRONICA_DESC': 'Explore all products in the Electronics category',
    'SECTIONS.BEAUTY': 'Beauty & Personal Care',
    'SECTIONS.BEAUTY_DESC': 'Explore all products in the Beauty category',
    'SECTIONS.ALTRO': 'Other',
    'SECTIONS.ALTRO_DESC': 'Explore all products in the Other category',

    'LOGIN.TITLE': 'Login to Market',
    'LOGIN.SUBTITLE': 'Enter your credentials to continue',
    'LOGIN.EMAIL': 'Email or Username',
    'LOGIN.EMAIL_PH': 'E.g. user@gmail.com or john',
    'LOGIN.EMAIL_REQ': 'Email or username is required',
    'LOGIN.EMAIL_INV': 'Enter a valid email address',
    'LOGIN.PWD': 'Password',
    'LOGIN.PWD_PH': 'Enter password',
    'LOGIN.PWD_REQ': 'Password is required',
    'LOGIN.PWD_MIN': 'Password must be at least 8 characters long',
    'LOGIN.FORGOT': 'Forgot password?',
    'LOGIN.BTN': 'Login',
    'LOGIN.NO_ACCOUNT': 'Don\'t have an account?',
    'LOGIN.SIGNUP_NOW': 'Sign up now',
    'LOGIN.RECENT_TITLE': 'Recent Logins',
    'LOGIN.RECENT_USE': 'Use another account',

    'SIGNUP.TITLE': 'Create Account',
    'SIGNUP.SUBTITLE': 'Join Market in a few simple steps',
    'SIGNUP.SUCCESS_TITLE': 'Registration complete!',
    'SIGNUP.SUCCESS_DESC': 'Your account has been created successfully. Redirecting...',
    'SIGNUP.FIRST_NAME': 'First Name',
    'SIGNUP.FIRST_NAME_PH': 'E.g. John',
    'SIGNUP.FIRST_NAME_REQ': 'First name is required',
    'SIGNUP.FIRST_NAME_MIN': 'First name must be at least 2 characters',
    'SIGNUP.LAST_NAME': 'Last Name',
    'SIGNUP.LAST_NAME_PH': 'E.g. Doe',
    'SIGNUP.LAST_NAME_REQ': 'Last name is required',
    'SIGNUP.LAST_NAME_MIN': 'Last name must be at least 2 characters',
    'SIGNUP.TERMS': 'I accept the Terms of Service and Privacy Policy',
    'SIGNUP.TERMS_REQ': 'You must accept the terms to register',
    'SIGNUP.BTN': 'Create Account',
    'SIGNUP.HAVE_ACCOUNT': 'Already have an account?',
    'SIGNUP.LOGIN_NOW': 'Login',
    'SIGNUP.GO_LOGIN': 'Go to Login',

    'CATALOG.TITLE': 'Product List',
    'CATALOG.ADD_TITLE': 'Add New Product',
    'CATALOG.NAME': 'Product Name',
    'CATALOG.NAME_REQ': 'Name required (min 3 characters).',
    'CATALOG.PRICE': 'Price (€)',
    'CATALOG.PRICE_REQ': 'Price required (min 0.01€).',
    'CATALOG.DESC': 'Description',
    'CATALOG.DESC_REQ': 'Description required (min 10 characters).',
    'CATALOG.SECTION': 'Section',
    'CATALOG.SECTION_SELECT': 'Choose a section...',
    'CATALOG.SECTION_REQ': 'Select a section.',
    'CATALOG.QTY': 'Initial Quantity',
    'CATALOG.BTN': 'Add Product',
    'CATALOG.NO_PRODUCTS': 'No products available in the list.',

    'DETAIL.SELECT': 'Click on a product in the list to see its details.',
    'DETAIL.NO_SELECTION': 'No product selected',
    'DETAIL.DELETE': 'Delete Product'
  }
};

// Servizio singleton che gestisce la lingua globale dell'applicazione (internazionalizzazione)
// Usa il localStorage per ricordare la scelta linguistica dell'utente alla successiva visita
@Injectable({
  providedIn: 'root'
})
export class I18nService {
  // Chiave usata nel localStorage per memorizzare il tema
  private readonly LANG_KEY = 'market-lang';
  
  // Subject che conserva e traccia i cambiamenti della lingua corrente
  private currentLangSubject = new BehaviorSubject<Lang>('it');
  
  // Observable pubblico che i pipe/componenti ascoltano per ricaricare le stringhe al cambio lingua
  currentLang$ = this.currentLangSubject.asObservable();

  // Al caricamento, legge la lingua salvata (se esiste) dal browser e la imposta
  constructor() {
    const saved = localStorage.getItem(this.LANG_KEY) as Lang;
    if (saved && (saved === 'it' || saved === 'en')) {
      this.currentLangSubject.next(saved);
    }
  }

  // Getter che restituisce in modo istantaneo (senza subscribe) la lingua attuale
  get currentLang(): Lang {
    return this.currentLangSubject.getValue();
  }

  // Cambia la lingua dell'app, aggiorna il localStorage e notifica tutti i pipe in ascolto
  setLang(lang: Lang) {
    localStorage.setItem(this.LANG_KEY, lang);
    this.currentLangSubject.next(lang);
  }

  // Funzione core del servizio: prende una "chiave" (es. 'HOME.TITLE') e restituisce il testo
  // tradotto nella lingua corrente. Se la chiave non esiste, ritorna la chiave stessa.
  translate(key: string): string {
    const lang = this.currentLang;
    return DICTIONARY[lang][key] || key;
  }
}
