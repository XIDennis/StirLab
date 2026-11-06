import { Component, computed, inject, input, output, signal } from '@angular/core';
import { CocktailService } from '../../services/cocktail';

@Component({
  selector: 'app-ingredient-picker',
  styleUrl: './ingredient-picker.css',
  templateUrl: './ingredient-picker.html',
})
export class IngredientPicker {
  private readonly cocktailService = inject(CocktailService);

  readonly showUnavailable = input(false);
  readonly showUnavailableChange = output<boolean>();

  readonly ingredients = this.cocktailService.ingredients;
  readonly availableIngredientKeys = this.cocktailService.availableIngredientKeys;
  readonly ingredientSearch = signal('');

  readonly matchingIngredients = computed(() => {
    const search = this.ingredientSearch().toLowerCase().trim();
    return this.ingredients()
      .filter((ingredient) => ingredient.name.toLowerCase().includes(search))
      .slice(0, 30);
  });

  readonly selectedIngredient = computed(() => {
    const search = this.ingredientSearch().trim().toLowerCase();
    return this.ingredients().find((ingredient) => ingredient.name.toLowerCase() === search);
  });

  addSelectedIngredient(): void {
    const ingredient = this.selectedIngredient();
    if (!ingredient || this.availableIngredientKeys().includes(ingredient.key)) {
      return;
    }

    this.cocktailService.addAvailableIngredient(ingredient.key);
    this.ingredientSearch.set('');
  }

  removeIngredient(key: string): void {
    this.cocktailService.removeAvailableIngredient(key);
  }

  ingredientName(key: string): string {
    return this.ingredients().find((ingredient) => ingredient.key === key)?.name ?? key;
  }

  setShowUnavailable(event: Event): void {
    this.showUnavailableChange.emit((event.target as HTMLInputElement).checked);
  }
}
