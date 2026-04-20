import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Creiamo un'interfaccia (come una struct in C/C++) per definire com'è fatto un Prodotto.
// Ci aiuta a non fare errori quando scriviamo il codice (TypeScript ci avvisa se manca qualcosa).
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  section: string;
}

// @Injectable significa che questo servizio può essere "iniettato" (usato) da qualsiasi componente.
// 'root' significa che ce n'è solo uno per tutta l'app (è un Singleton).
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Questa è la chiave ("nome del file") che useremo per salvare i prodotti nella memoria del browser
  private readonly STORAGE_KEY = 'market-products';

  // Questo è il nostro "database" temporaneo in RAM. È un array di oggetti Product.
  private initialProducts: Product[] = [
    { id: 1, name: 'Pane Integrale', price: 2.50, description: 'Pane fresco integrale', section: 'alimentari-e-bevande' },
    { id: 2, name: 'Latte', price: 1.20, description: 'Latte intero fresco', section: 'alimentari-e-bevande' },
    { id: 3, name: 'Cuffie Bluetooth', price: 150.00, description: 'Cuffie con cancellazione del rumore', section: 'elettronica' },
    { id: 4, name: 'Crema Viso', price: 25.00, description: 'Crema idratante per il viso', section: 'beauty' },
    { id: 5, name: 'Lego Star Wars', price: 120.00, description: 'Set di costruzioni spaziali', section: 'giocattoli' }
  ];

  // Il BehaviorSubject è come una variabile speciale che "strilla" a tutti quando cambia il suo valore.
  // Inizializziamo a vuoto, perché dobbiamo prima controllare il LocalStorage nel costruttore!
  private productsSubject = new BehaviorSubject<Product[]>([]);
  
  // Questa è la "cassa di risonanza" pubblica che i componenti ascoltano (Observable) per sapere se ci sono nuovi prodotti.
  products$ = this.productsSubject.asObservable();

  constructor() {
    this.loadProducts();
  }

  // Funzione privata per caricare i dati all'avvio dell'app.
  private loadProducts() {
    // Andiamo a leggere la memoria del browser (localStorage)
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    
    if (savedData) {
      // Se ci sono dati salvati (sono una stringa JSON), li trasformiamo di nuovo in un Array vero e proprio
      const parsedProducts = JSON.parse(savedData);
      this.productsSubject.next(parsedProducts);
    } else {
      // Altrimenti, se è la prima volta che l'utente apre il sito, usiamo i 5 prodotti finti (initialProducts)
      this.productsSubject.next(this.initialProducts);
      // E li salviamo per la prossima volta!
      this.saveToStorage(this.initialProducts);
    }
  }

  // Funzione privata per salvare fisicamente l'array sul disco (nella memoria del browser)
  private saveToStorage(products: Product[]) {
    // Il localStorage accetta solo stringhe (testo), quindi dobbiamo convertire l'Array (oggetti) in una stringa JSON.
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
  }

  // Metodo per farsi dare l'array di prodotti al momento attuale.
  getProducts(): Product[] {
    return this.productsSubject.getValue();
  }

  // Metodo per aggiungere un nuovo prodotto (Omit significa "tutto tranne l'ID", che lo calcoliamo noi).
  addProduct(product: Omit<Product, 'id'>) {
    const currentProducts = this.getProducts();
    
    // Troviamo l'ID più grande e aggiungiamo 1. È come l'AUTO_INCREMENT di un database SQL.
    const newId = currentProducts.length > 0 ? Math.max(...currentProducts.map(p => p.id)) + 1 : 1;
    
    // Creiamo l'oggetto finale unendo i dati dal form (...product) e il nuovo ID calcolato.
    const newProduct = { ...product, id: newId };
    
    // Uniamo il nuovo prodotto a quelli vecchi in un nuovo array
    const updatedProducts = [...currentProducts, newProduct];
    
    // Salviamo permanentemente nel browser
    this.saveToStorage(updatedProducts);
    
    // Avvisiamo tutti che la lista è cambiata (la UI si aggiornerà da sola)
    this.productsSubject.next(updatedProducts);
  }

  // Metodo per eliminare un prodotto usando il suo ID univoco.
  deleteProduct(id: number) {
    const currentProducts = this.getProducts();
    
    // Usiamo filter() per creare un nuovo array tenendo solo i prodotti che NON hanno l'ID da eliminare.
    const filteredProducts = currentProducts.filter(p => p.id !== id);
    
    // Salviamo permanentemente nel browser
    this.saveToStorage(filteredProducts);
    
    // Aggiorniamo la lista globale inviando il nuovo array filtrato (la UI si aggiornerà da sola)
    this.productsSubject.next(filteredProducts);
  }
}
