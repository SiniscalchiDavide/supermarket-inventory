import { Routes } from '@angular/router';
import { Home } from './pagine/home/home';
import { Settings } from './pagine/settings/settings';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'settings', component: Settings },
];
