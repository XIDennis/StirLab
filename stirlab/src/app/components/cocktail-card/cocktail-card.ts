import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cocktail-card',
  imports: [RouterLink],
  templateUrl: './cocktail-card.html',
  styleUrl: './cocktail-card.css',
})
export class CocktailCard {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() category: string = '';
  @Input() image: string = '';
  @Input() description: string = '';
}
