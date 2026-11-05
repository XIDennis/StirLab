import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cocktail-card',
  imports: [],
  templateUrl: './cocktail-card.html',
  styleUrl: './cocktail-card.css',
})
export class CocktailCard {
  @Input() name: string = '';
  @Input() category: string = '';
  @Input() image: string = '';
  @Input() description: string = '';
}
