import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { ProductDetail } from '../product-detail/product-detail';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ReactiveFormsModule, ProductDetail],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  // OnPush dice ad Angular di ricalcolare l'HTML solo se cambiano gli input (props) dall'esterno, 
  // oppure se scatta un evento o un observable. Fa andare l'app molto più veloce.
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList implements OnInit {
  // inject() è il modo moderno (Angular 14+) per richiamare servizi dentro una classe. 
  // Prima si usava metterli dentro i parametri del costruttore.
  private productService = inject(ProductService);
  private fb = inject(FormBuilder); // FormBuilder serve a costruire i form in modo "Reattivo" e controllato in TS.

  // Questo Observable (indicato per convenzione col simbolo del dollaro finale $)
  // è un "tubo" dove scorrono i dati. L'HTML si "iscriverà" a questo tubo con la pipe 'async'.
  products$!: Observable<Product[]>;
  
  // Variabile che tiene in memoria quale prodotto ha cliccato l'utente per mostrarlo nei dettagli.
  selectedProduct: Product | undefined;
  
  // Questa è la struttura logica del nostro form di inserimento.
  productForm!: FormGroup;

  // L'array delle sezioni disponibili per il dropdown (Select)
  sezioni: string[] = ['Alimentari e bevande', 'Giocattoli', 'Elettronica', 'Beauty', 'Altro'];

  // Testo visualizzato sul pulsante del dropdown custom
  sezioneSelezionataText: string = 'Seleziona una sezione...';

  // ngOnInit viene lanciato automaticamente da Angular appena il componente è pronto.
  ngOnInit() {
    // Ci agganciamo all'observable globale del servizio per avere sempre la lista aggiornata.
    this.products$ = this.productService.products$;
    
    // Inizializziamo il form dicendo ad Angular quali campi esistono e quali regole (Validators) devono rispettare.
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Obbligatorio, min 3 caratteri
      price: ['', [Validators.required, Validators.min(0.01)]], // Deve costare almeno un centesimo
      description: ['', [Validators.required, Validators.minLength(10)]], // Minimo 10 caratteri di spiegazione
      section: ['', Validators.required] // Bisogna per forza scegliere la sezione dal menu a tendina
    });
  }

  // Funzione chiamata quando si seleziona una voce dal dropdown custom
  selezionaSezioneDalDropdown(sezione: string) {
    this.sezioneSelezionataText = sezione;
    // Impostiamo il valore nel form logico, formattandolo come serve (es. "alimentari-e-bevande")
    this.productForm.get('section')?.setValue(sezione.toLowerCase().replace(/ /g, '-'));
    this.productForm.get('section')?.markAsTouched(); // Così se è vuoto fa vedere l'errore
  }

  // Funzione chiamata quando l'utente fa (click) su una riga della lista
  selezioneProdotto(product: Product) {
    this.selectedProduct = product;
  }

  // Funzione per il bottone "Cestino". 
  // Passiamo l'$event per usare stopPropagation, altrimenti cliccando il cestino si attiverebbe 
  // anche il (click) della riga che sta sotto, e ci farebbe selezionare il prodotto mentre lo eliminiamo.
  eliminaProdotto(id: number, event: Event) {
    event.stopPropagation();
    this.productService.deleteProduct(id);
    
    // Se stavamo guardando i dettagli del prodotto appena eliminato, togliamo la selezione (scompare il dettaglio).
    if (this.selectedProduct?.id === id) {
      this.selectedProduct = undefined;
    }
  }

  // Funzione chiamata al submit del form di aggiunta.
  aggiungiProdotto() {
    // Controllo di sicurezza: inseriamo i dati solo se tutte le regole (validators) sono state rispettate.
    if (this.productForm.valid) {
      // Passiamo tutti i dati scritti nell'input al servizio.
      this.productService.addProduct(this.productForm.value);
      
      // Resettiamo/svuotiamo tutti i campi del form così è pronto per il prossimo inserimento.
      this.productForm.reset(); 
      // Resettiamo anche il testo del dropdown
      this.sezioneSelezionataText = 'Seleziona una sezione...';
    }
  }

  // Questo metodo viene attivato dall'evento (@Output) del componente "figlio" (product-detail)
  // quando l'utente clicca "Elimina" da dentro la scheda di dettaglio.
  onProductDeleted(id: number) {
    this.productService.deleteProduct(id);
    this.selectedProduct = undefined;
  }
}