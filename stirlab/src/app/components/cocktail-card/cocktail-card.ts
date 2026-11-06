import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CocktailIngredient } from '../../models/cocktail';

@Component({
  selector: 'app-cocktail-card',
  imports: [RouterLink],
  templateUrl: './cocktail-card.html',
  styleUrl: './cocktail-card.css',
})
export class CocktailCard {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() category: string = '';
  @Input() image: string = '';
  @Input() ingredients: CocktailIngredient[] | undefined;
  @Input() missingIngredients: number | undefined;
  @Input() isReady = false;
  @Input() isUnavailable = false;
  @Input() isPopular = false;

  get ingredientsPreview(): string {
    if (!this.ingredients || this.ingredients.length === 0) return '';

    const fullString = this.ingredients.map((item) => item.ingredient.name).join(', ');

    if (fullString.length > 50) {
      return fullString.substring(0, 47) + '...';
    }

    return fullString;
  }
}
