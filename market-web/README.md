# MarketWeb - Gestione Inventario Supermercato

Un'applicazione Angular moderna per la gestione dell'inventario di un supermercato. Sviluppata seguendo le specifiche tecniche e di design.

## Requisiti e Funzionalità
- **Angular 21 Standalone Components**: Struttura moderna senza moduli.
- **Bootstrap 5**: Griglia bento-box e componenti responsive.
- **Design Moderno**: Stile minimalista, glassmorphism esteso a navbar, dropdown e testo, con angoli estremamente arrotondati e focus visibile (accessibilità WCAG).
- **Tema Scuro/Chiaro**: Gestione completa tramite `ThemeService` e CSS custom properties, con salvataggio della preferenza in `localStorage`.
- **Hero Animato**: Sfondo con gradienti dinamici e particelle animate per la homepage.
- **Scroll Button Intelligente**: Appare dopo 150px di scroll e permette di navigare/scorrere alla lista prodotti fluidamente.
- **Gestione Stato**: Utilizzo di `BehaviorSubject` nel servizio per condividere i dati tra componenti.

## Accessibilità ed Effetti Visivi
L'interfaccia adotta un focus outline visibile di colore accentato e contrasti superiori a 4.5:1 per superare gli standard WCAG 2.1.
Gli effetti di *glassmorphism* sono creati con `backdrop-filter: blur(10px)`, e i bottoni mantengono coerenza visiva usando le variabili globali in `styles.css`.

## Installazione

1. Assicurati di avere Node.js installato.
2. Naviga nella cartella del progetto `market-web`.
3. Esegui il comando per installare le dipendenze (incluso Bootstrap):
   ```bash
   npm install
   ```

## Avvio Sviluppo

Esegui l'applicazione in ambiente di sviluppo locale:
```bash
ng serve
```
Apri il browser all'indirizzo `http://localhost:4200/`.

## Esecuzione Test

Il progetto include unit test (Vitest) che verificano, tra le altre cose:
- **ThemeService**: Salvataggio nel `localStorage` e cambio del tema in pagina.
- **App Component**: Visibilità dello scroll-triggered button al superamento dei 150px di scroll.

Esegui la suite di test completa:
```bash
ng test
```
