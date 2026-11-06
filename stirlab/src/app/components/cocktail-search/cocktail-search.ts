import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-cocktail-search',
  styleUrl: './cocktail-search.css',
  templateUrl: './cocktail-search.html',
})
export class CocktailSearch {
  searchChange = output<string>();
}
