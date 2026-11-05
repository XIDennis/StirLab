import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CocktailDetails } from './pages/cocktail-details/cocktail-details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'cocktails/:id',
    component: CocktailDetails,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
