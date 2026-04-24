import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Interfaccia che definisce la struttura di un prodotto nel catalogo
export interface Product {
  id: number;           // Identificatore univoco del prodotto
  name: string;         // Nome del prodotto
  price: number;        // Prezzo in euro
  description: string;  // Descrizione dettagliata del prodotto
  section: string;      // Sezione/categoria di appartenenza
  quantity: number;     // Quantità disponibile
}

// Servizio singleton per gestire i prodotti: carica, aggiunge, elimina e persiste in localStorage
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  // Chiave per accedere ai dati nel localStorage del browser
  private readonly STORAGE_KEY = 'market-products';

  // Array di 5 prodotti predefiniti da mostrare al primo caricamento
  private initialProducts: Product[] = [
    { id: 1, name: 'Pane Integrale', price: 2.50, description: 'Pane fresco integrale', section: 'alimentari-e-bevande', quantity: 10 },
    { id: 2, name: 'Latte', price: 1.20, description: 'Latte intero fresco', section: 'alimentari-e-bevande', quantity: 20 },
    { id: 3, name: 'Cuffie Bluetooth', price: 150.00, description: 'Cuffie con cancellazione del rumore', section: 'elettronica', quantity: 5 },
    { id: 4, name: 'Crema Viso', price: 25.00, description: 'Crema idratante per il viso', section: 'beauty', quantity: 15 },
    { id: 5, name: 'Lego Star Wars', price: 120.00, description: 'Set di costruzioni spaziali', section: 'giocattoli', quantity: 8 }
  ];

  // BehaviorSubject che emette l'array aggiornato di prodotti ogni volta che cambia
  private productsSubject = new BehaviorSubject<Product[]>([]);
  
  // Observable pubblico che i componenti ascoltano per ricevere aggiornamenti sulla lista
  products$ = this.productsSubject.asObservable();

  // Carica i prodotti dal localStorage al momento dell'instanziazione del servizio
  constructor() {
    this.loadProducts();
  }

  // Legge i prodotti dal localStorage o usa i dati iniziali se è la prima volta
  private loadProducts() {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    
    if (savedData) {
      // Converte la stringa JSON memorizzata in array di oggetti
      const parsedProducts = JSON.parse(savedData);
      this.productsSubject.next(parsedProducts);
    } else {
      // Prima volta: usa i prodotti iniziali e li salva subito
      this.productsSubject.next(this.initialProducts);
      this.saveToStorage(this.initialProducts);
    }
  }

  // Salva i prodotti nel localStorage del browser per persistenza tra sessioni
  private saveToStorage(products: Product[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
  }

  // Ritorna l'array di prodotti attuale dal BehaviorSubject
  getProducts(): Product[] {
    return this.productsSubject.getValue();
  }

  // Aggiunge un nuovo prodotto: calcola l'ID, lo aggiunge e aggiorna il BehaviorSubject
  addProduct(product: Omit<Product, 'id'>) {
    const currentProducts = this.getProducts();
    // Genera un ID univoco incrementale (max ID + 1)
    const newId = currentProducts.length > 0 ? Math.max(...currentProducts.map(p => p.id)) + 1 : 1;
    // Crea il prodotto completo e lo aggiunge alla lista, garantendo una quantità iniziale
    const newProduct = { ...product, id: newId, quantity: product.quantity ?? 0 };
    const updatedProducts = [...currentProducts, newProduct];
    
    // Persiste i cambiamenti e notifica i subscribers
    this.saveToStorage(updatedProducts);
    this.productsSubject.next(updatedProducts);
  }

  // Aggiorna la quantità di un prodotto
  updateQuantity(id: number, delta: number) {
    const currentProducts = this.getProducts();
    const updatedProducts = currentProducts.map(p => {
      if (p.id === id) {
        const newQuantity = Math.max(0, (p.quantity || 0) + delta);
        return { ...p, quantity: newQuantity };
      }
      return p;
    });
    this.saveToStorage(updatedProducts);
    this.productsSubject.next(updatedProducts);
  }

  // Rimuove un prodotto per ID: filtra la lista, persiste e aggiorna gli subscribers
  deleteProduct(id: number) {
    const currentProducts = this.getProducts();
    // Mantiene solo i prodotti che NON hanno l'ID da eliminare
    const filteredProducts = currentProducts.filter(p => p.id !== id);
    
    // Persiste i cambiamenti e notifica i subscribers
    this.saveToStorage(filteredProducts);
    this.productsSubject.next(filteredProducts);
  }
}
