# supermarket-inventory
Scrivere in un commento qui sotto la composizione dei gruppi.
Consegnare link al repository.

Traccia:
Creare un'applicazione Angular che gestisca una lista di prodotti. L'applicazione dovrà utilizzare componenti, variabili con il decoratore @Input e array.

Requisiti:

Struttura dell'applicazione

Creare un'applicazione Angular con almeno due componenti:
ProductListComponent: mostra un elenco di prodotti.
ProductDetailComponent: mostra i dettagli di un singolo prodotto selezionato.

Dati da gestire
Creare un array di oggetti in ProductListComponent che rappresenti i prodotti.
Ogni prodotto deve avere almeno i seguenti campi:

interface Product {

name: string;

price: number;
 
description: string;

}

L'array dovrà contenere almeno 5 prodotti iniziali.

Visualizzazione dei prodotti
ProductListComponent deve visualizzare l'elenco dei prodotti utilizzando *ngFor.
Cliccando su un prodotto, i dettagli di quel prodotto devono essere mostrati nel ProductDetailComponent.

Utilizzo del decoratore @Input
ProductDetailComponent deve ricevere tramite @Input i dati del prodotto selezionato da ProductListComponent.

Interazione tra componenti
Quando un utente clicca su un prodotto in ProductListComponent, quel prodotto deve essere passato a ProductDetailComponent per essere visualizzato.

Stilizzazione
Utilizzare Bootstrap (o CSS personalizzato) per rendere l'interfaccia più leggibile e gradevole.
_________
Aggiungere un pulsante "Elimina" accanto a ogni prodotto per rimuoverlo dalla lista.
Consentire l'aggiunta di nuovi prodotti tramite un modulo.
Mostrare un messaggio se nessun prodotto è selezionato in ProductDetailComponent.
NB: utilizzare github, dichiarare di non poter lavorare perché qualcuno è assente comporterà valutazione pari a 1 per tutto il gruppo.
Per l'interrogazione/presentazione bisognerà essere preparati su tutte le parti di codice, anche quelle scritte dagli altri.
