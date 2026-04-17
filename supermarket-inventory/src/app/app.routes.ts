import { Routes } from '@angular/router';
import { Home } from './pagine/home/home';
import { Settings } from './pagine/settings/settings';
import { ProductListComponent } from './componenti/product-list-component/product-list-component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'settings', component: Settings },
  { path: 'beauty', component: ProductListComponent }, // Questa è la tua "stanza" ufficiale
];
