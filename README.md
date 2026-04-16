# Supermarket - Inventory

## Consegna
- Scrivere **nei commenti qui sotto** la composizione dei gruppi  
- Consegnare il **link al repository** del progetto  

---

## Obiettivo
Realizzare un'applicazione **Angular** che gestisca una lista di prodotti, utilizzando:
- Componenti  
- Array di oggetti  
- Comunicazione tra componenti tramite `@Input`  

---

## Struttura dell'applicazione

Creare almeno **due componenti**:

### 1. `ProductListComponent`
- Mostra l'elenco dei prodotti  

### 2. `ProductDetailComponent`
- Mostra i dettagli del prodotto selezionato  

---

## Dati da gestire

All'interno di `ProductListComponent`, creare un array di prodotti:

```ts
interface Product {
  name: string;
  price: number;
  description: string;
}
```

## Requisiti sui dati
- L'array deve contenere **almeno 5 prodotti**
- I dati possono essere **statici (hardcoded)**

---

## Visualizzazione dei prodotti
- Utilizzare `*ngFor` per iterare e mostrare la lista  
- Ogni prodotto deve essere **cliccabile**  

### Al click:
- Mostrare i dettagli nel `ProductDetailComponent`  

---

## Comunicazione tra componenti

### Utilizzo di `@Input`
- `ProductDetailComponent` deve ricevere il prodotto selezionato tramite `@Input`  

### Flusso:
1. L’utente clicca un prodotto in `ProductListComponent`  
2. Il prodotto selezionato viene passato al componente `ProductDetailComponent`  
3. I dettagli vengono visualizzati  

---

## Stilizzazione

### Tecnologie:
- **Bootstrap**  
  **oppure**  
- CSS personalizzato  

### Obiettivo:
Rendere l’interfaccia:
- Chiara  
- Leggibile  
- Gradevole  
