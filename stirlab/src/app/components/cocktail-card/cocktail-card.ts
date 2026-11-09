import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CocktailIngredient } from '../../models/cocktail';

interface CocktailIngredientVM extends CocktailIngredient {
  isAvailable: boolean;
}

@Component({
  selector: 'app-cocktail-card',
  imports: [RouterLink],
  templateUrl: './cocktail-card.html',
  styleUrl: './cocktail-card.css',
})
export class CocktailCard implements OnChanges {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() category: string = '';
  @Input() image: string = '';
  @Input() ingredients: CocktailIngredient[] | undefined;
  @Input() missingIngredients: number | undefined;
  @Input() isReady = false;
  @Input() isUnavailable = false;
  @Input() isPopular = false;
  @Input() showAllIngredients: boolean = false;
  @Input() availableIngredientKeys: string[] = [];

  public vmIngredients: CocktailIngredientVM[] | undefined;
  public ingredientsPreview: string = '';

  ngOnChanges(changes: SimpleChanges) {
    // Only re-calculate when inputs actually change
    if (changes['ingredients'] || changes['availableIngredientKeys']) {
      if (!this.ingredients) {
        this.vmIngredients = undefined;
        return;
      }

      const keysSet = new Set(this.availableIngredientKeys);

      // Map the data once
      this.vmIngredients = this.ingredients.map((ing) => ({
        ...ing,
        isAvailable: keysSet.has(ing.ingredient.key),
      }));
      const fullString = this.ingredients.map((item) => item.ingredient.name).join(', ');
      this.ingredientsPreview =
        fullString.length > 50 ? fullString.substring(0, 47) + '...' : fullString;
    }
  }
}
