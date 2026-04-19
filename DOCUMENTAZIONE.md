# SUPERMARKET INVENTORY - APPLICAZIONE ANGULAR
## Progetto TPSI 2025-2026

---

## 📋 COMPOSIZIONE DEL GRUPPO

```
GRUPPO: Supermarket Inventory Development Team
Branch: Davide's-Branch
Repository: https://github.com/SiniscalchiDavide/supermarket-inventory
```

### Responsabilità Implementate:
- **Gestione Componenti**: ProductListComponent, ProductDetailComponent
- **Gestione Pagine**: FoodPageComponent, BeautyCareComponent  
- **Gestione Stili**: Liquid Glass (Glassmorphism) su tutto il progetto
- **Gestione Dati**: Interface Product, Array di prodotti
- **Gestione Repository**: Git, Commit, Push

---

## ✅ REQUISITI TRACCIA COMPLETATI

### 1. **Struttura dell'Applicazione** ✓
- ✓ ProductListComponent: Visualizza elenco di prodotti
- ✓ ProductDetailComponent: Mostra dettagli singolo prodotto
- ✓ Componenti standalone con imports

### 2. **Dati da Gestire** ✓
```typescript
interface Product {
  id: number;              // ID univoco
  name: string;            // Nome prodotto
  price: number;           // Prezzo in €
  description: string;     // Descrizione
  category: string;        // Categoria
}
```
- ✓ Array di almeno 9+ prodotti iniziali (Food + Beauty)
- ✓ Prodotti divisi per categorie

### 3. **Visualizzazione dei Prodotti** ✓
- ✓ Utilizzo di `*ngFor` per loop su array
- ✓ Clic su prodotto per mostrare dettagli
- ✓ ProductDetailComponent riceve dati via `@Input`

### 4. **Decoratore @Input** ✓
- ✓ ProductListComponent accetta: titolo, categorie, prodotti
- ✓ ProductDetailComponent accetta: prodotto
- ✓ Passaggio dati tra componenti funzionante

### 5. **Interazione tra Componenti** ✓
- ✓ Clic su prodotto seleziona quello corrente
- ✓ Dettagli vengono visualizzati in ProductDetailComponent
- ✓ Binding bidirezionale dove necessario

### 6. **Stilizzazione** ✓
- ✓ **STILE LIQUID GLASS (GLASSMORPHISM)**
  - Backdrop-filter blur effect
  - Semi-trasparenza rgba
  - Border con effetto glow
  - Animazioni smooth
  - Gradient text
  - Ombre soft

### 7. **Funzionalità Aggiuntive** ✓
- ✓ **Pulsante Elimina**: Rimuove prodotto dalla lista
- ✓ **Form Aggiunta**: Inserisci nome, prezzo, descrizione, categoria
- ✓ **Messaggio Nessun Prodotto**: Template if/else nel DetailComponent
- ✓ **Filtraggio Categoria**: Bottoni filtro nella lista
- ✓ **Validazione Form**: Verifica dati prima di aggiungere

---

## 🎨 STILE LIQUID GLASS - DETTAGLI IMPLEMENTAZIONE

### Effetti Applicati:

#### 1. **Card Container**
```css
background: rgba(255, 255, 255, 0.25);
backdrop-filter: blur(10px);
border: 1.5px solid rgba(255, 255, 255, 0.4);
border-radius: 20px;
box-shadow: 0 8px 32px rgba(...), inset highlight;
```

#### 2. **Bottoni Glass**
```css
background: rgba(232, 72, 152, 0.1);
backdrop-filter: blur(10px);
border: 1.5px solid rgba(232, 72, 152, 0.4);
transition: all 0.3s cubic-bezier(...);
```

#### 3. **Animazioni**
- Hover: Scale 1.02, translateY(-12px)
- Shimmer effect su card
- Smooth transitions con cubic-bezier

#### 4. **Gradient Text**
```css
background: linear-gradient(135deg, #e84898, #ff69b4);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## 📁 STRUTTURA PROGETTO

```
supermarket-inventory/
├── market/                              # Applicazione Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── product-list-component/      # Lista prodotti
│   │   │   │   ├── product-detail-component/    # Dettagli prodotto
│   │   │   │   └── navbar/                      # Navigazione
│   │   │   ├── pagina/
│   │   │   │   ├── food-page/                   # Reparto Food
│   │   │   │   ├── beauty-care/                 # Reparto Beauty
│   │   │   │   ├── home/                        # Home
│   │   │   │   ├── login/                       # Login
│   │   │   │   └── register/                    # Registrazione
│   │   │   ├── app.ts                           # Root Component
│   │   │   ├── app.routes.ts                    # Routing
│   │   │   ├── app.css                          # Stili globali
│   │   │   └── product.ts                       # Interface Product
│   │   ├── main.ts
│   │   └── styles.css
│   ├── package.json
│   ├── angular.json
│   └── README.md
└── DOCUMENTAZIONE.md                    # Questo file
```

---

## 🚀 COME AVVIARE L'APPLICAZIONE

### 1. **Installazione Dipendenze**
```bash
cd market
npm install
```

### 2. **Avviare Development Server**
```bash
ng serve
# oppure
npm start
```

### 3. **Accedere all'Applicazione**
```
http://localhost:4200
```

### 4. **Build Produzione**
```bash
ng build --configuration production
```

---

## 🔍 NAVIGAZIONE APPLICAZIONE

| Pagina | Route | Descrizione |
|--------|-------|-----------|
| Home | `/` | Homepage principale |
| Food Market | `/food` | Visualizza prodotti alimentari |
| Beauty & Care | `/Beauty&Care` | Visualizza prodotti cosmetici |
| Login | `/login` | Accesso utente |
| Registrazione | `/register` | Creazione account |

---

## 📱 FEATURES PRINCIPALI

### ProductListComponent
```typescript
// Props @Input:
- titolo: string                // Titolo sezione
- categorie: string[]           // Array categorie
- prodotti: Product[]           // Array prodotti
- coloreTema: string            // Colore tema (default: #e84898)
- coloreSfondo: string          // Colore sfondo (default: #fff0f5)

// Metodi pubblici:
- selezionaProdotto(p: Product)     // Seleziona prodotto
- filtraCategoria(cat: string)      // Filtra per categoria
- eliminaProdotto(id: number)       // Rimuove prodotto
- aggiungiProdotto()                // Aggiunge nuovo prodotto
```

### ProductDetailComponent
```typescript
// Props @Input:
- prodotto?: Product   // Prodotto da visualizzare

// Template:
- Se prodotto presente: Mostra dettagli completi
- Se prodotto undefined: Mostra messaggio placeholder
```

---

## 🎯 TECNOLOGIE UTILIZZATE

| Tecnologia | Versione | Uso |
|------------|----------|-----|
| Angular | 21.2.7 | Framework principale |
| TypeScript | 5.x | Linguaggio |
| RxJS | 7.x | Reactive programming |
| Bootstrap | 5.x | CSS utilities |
| CSS3 | - | Glassmorphism effects |
| Git | - | Version control |

---

## 📝 NOTES IMPLEMENTAZIONE

### Liquid Glass (Glassmorphism):
- **backdrop-filter: blur(10px)** - Effetto blur dello sfondo
- **rgba semi-trasparente** - Semi-trasparenza per effetto glass
- **Border luminoso** - Border con rgba bianco semi-trasparente
- **Ombre doppie** - Esterno e inset per profondità
- **Animazioni smooth** - Transizioni con cubic-bezier(0.25, 0.46, 0.45, 0.94)

### Scelte di Design:
- ✓ Colore primario: **#e84898** (Rosa acceso)
- ✓ Colore sfondo: **#fff0f5** (Rosa molto chiaro)
- ✓ Tema scuro supportato nel styles.css
- ✓ Responsive design con griglia flessibile
- ✓ Accessibility considerations (colori ad alto contrasto)

---

## 🔗 REPOSITORY GITHUB

**Link Repository**: https://github.com/SiniscalchiDavide/supermarket-inventory

**Branch**: `Davide's-Branch`

**Ultimo Commit**:
```
🎨 Sistema Liquid Glass Glassmorphism per Supermarket Inventory
- Stile Liquid Glass su tutti i componenti
- Card con backdrop-filter blur e semi-trasparenza
- Bottoni con effetto glass
- Tutte le funzionalità traccia implementate
```

---

## ✍️ PRESENTAZIONE E INTERROGAZIONE

### Punti Chiave da Conoscere:

1. **ProductListComponent**: 
   - Come funziona il filtro per categoria?
   - Come aggiungere/eliminare prodotti?
   - Dove passa i dati a ProductDetailComponent?

2. **ProductDetailComponent**:
   - Come riceve i dati via @Input?
   - Che cos'è il template ng-template?
   - Come mostra il messaggio quando nessun prodotto è selezionato?

3. **Stile Liquid Glass**:
   - Cosa significa backdrop-filter?
   - Come si crea un border luminoso?
   - Quali animazioni sono state implementate?

4. **Gestione Dati**:
   - Come è strutturata l'interface Product?
   - Dove sono memorizzati i prodotti?
   - Come funziona il two-way binding con [(ngModel)]?

5. **Routing**:
   - Come si navigare tra le pagine?
   - Quale è il percorso per cada pagina?
   - Come si passa data tra pagine?

---

## 📞 CONTATTI E SUPPORT

Per domande o clarificazioni su qualsiasi parte del codice:
- Consultare il repository GitHub
- Leggere i commenti nel codice
- Fare riferimento a questa documentazione

---

**Data Creazione**: 19 Aprile 2026  
**Ultima Modifica**: 19 Aprile 2026  
**Stato Progetto**: ✅ COMPLETATO E DEPLOYATO
