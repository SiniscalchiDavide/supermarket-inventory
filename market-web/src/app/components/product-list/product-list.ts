import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { ProductDetail } from '../product-detail/product-detail';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslatePipe } from '../../pipes/translate.pipe';

// Componente principale che visualizza la lista di prodotti e gestisce il form di aggiunta
@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ReactiveFormsModule, ProductDetail, TranslatePipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush  // Ottimizzazione: rileva cambiamenti solo su input/eventi
})
export class ProductList implements OnInit {
  // Inietta i servizi necessari
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  // Observable che emette l'array di prodotti quando i dati cambiano
  products$!: Observable<Product[]>;
  
  // Prodotto attualmente selezionato per mostrare i dettagli
  selectedProduct: Product | undefined;
  
  // FormGroup reattivo per validare l'input del nuovo prodotto
  productForm!: FormGroup;
  
  // Lista delle sezioni disponibili nel dropdown del form
  sezioni: string[] = ['Alimentari', 'Giocattoli', 'Elettronica', 'Beauty', 'Altro'];
  
  // Testo visualizzato nel dropdown (si aggiorna quando l'utente sceglie)
  sezioneSelezionataText: string = 'Seleziona una sezione...';

  // Inizializza il componente: carica i prodotti e crea il form di aggiunta
  ngOnInit() {
    // Subscribe all'Observable dei prodotti dal servizio
    this.products$ = this.productService.products$;
    
    // Crea il form reattivo con validatori su ogni campo
    this.productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    section: ['', [Validators.required]],
    quantity: [0, [Validators.min(0)]]
  });

    // Ascolta i query params della rotta (es. productId, scroll)
    // Usato quando si naviga da ricerca a catalogo con prodotto selezionato
    this.route.queryParams.subscribe(params => {
      if (params['productId']) {
        const productId = parseInt(params['productId'], 10);
        const products = this.productService.getProducts();
        const product = products.find(p => p.id === productId);
        
        if (product) {
          this.selectedProduct = product;
          // Forza Angular a rilevare i cambiamenti (OnPush lo rende necessario)
          this.cdr.markForCheck();
          
          // Se richiesto, scrolla il prodotto al centro dello schermo
          if (params['scroll'] === 'true') {
            setTimeout(() => {
              this.scrollProductIntoView();
            }, 300);
          }
        }
      }
    });
  }

  // Scrolla il componente product-detail al centro dello schermo (asse Y)
  private scrollProductIntoView() {
    const productDetailElement = document.querySelector('app-product-detail');
    if (productDetailElement) {
      // Calcola la posizione per centrare verticalmente il prodotto
      const elementPosition = productDetailElement.getBoundingClientRect();
      const offsetPosition = elementPosition.top + window.scrollY - (window.innerHeight / 2) + (elementPosition.height / 2);
      
      // Effettua lo scroll fluido
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Aggiorna il text del dropdown quando l'utente seleziona una sezione
  selezionaSezioneDalDropdown(sezione: string) {
    this.sezioneSelezionataText = sezione;
    // Converte il nome leggibile in formato slug, gestendo il caso specifico di Alimentari
    const slug = sezione === 'Alimentari' ? 'alimentari-e-bevande' : sezione.toLowerCase().replace(/ /g, '-');
    this.productForm.get('section')?.setValue(slug);
    this.productForm.get('section')?.markAsTouched();
  }

  // Seleziona un prodotto dalla lista per mostrare i dettagli a destra
  selezioneProdotto(product: Product) {
    this.selectedProduct = product;
  }

  // Elimina un prodotto dalla lista (evento dal bottone trash)
  eliminaProdotto(id: number, event: Event) {
    event.stopPropagation();  // Evita che il click propaghi al parent (la riga)
    this.productService.deleteProduct(id);
    
    // Se stava mostrando il prodotto eliminato, pulisci il dettaglio
    if (this.selectedProduct?.id === id) {
      this.selectedProduct = undefined;
    }
  }

  // Aggiunge un nuovo prodotto dal form (validazione già effettuata)
  aggiungiProdotto() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value);
      // Pulisci il form per un nuovo inserimento
      this.productForm.reset();
      this.sezioneSelezionataText = 'Seleziona una sezione...';
    }
  }

  updateQuantity(id: number, delta: number) {
    this.productService.updateQuantity(id, delta);
  }

  // Callback quando il componente figlio ProductDetail emette un evento delete
  onProductDeleted(id: number) {
    this.productService.deleteProduct(id);
    this.selectedProduct = undefined;
  }
}