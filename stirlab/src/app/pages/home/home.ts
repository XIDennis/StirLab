import { Component, signal, computed, inject } from '@angular/core';
import { CocktailCard } from '../../components/cocktail-card/cocktail-card';
import { Cocktail } from '../../models/cocktail';
import { CocktailService } from '../../services/cocktail';

interface CocktailMatch {
  cocktail: Cocktail;
  missingIngredients: number;
  isReady: boolean;
}

@Component({
  selector: 'app-home',
  imports: [CocktailCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  title = 'StirLab';
  subtitle = 'Discover your next favourite cocktail.';

  readonly cocktailService = inject(CocktailService);

  cocktails = this.cocktailService.cocktails;
  ingredients = this.cocktailService.ingredients;

  searchTerm = signal('');

  selectedCategory = signal('All');

  ingredientSearch = signal('');

  availableIngredientKeys = this.cocktailService.availableIngredientKeys;

  categories = computed(() => [
    'All',
    ...new Set(this.cocktails().map((cocktail) => cocktail.category)),
  ]);

  matchingIngredients = computed(() => {
    const search = this.ingredientSearch().toLowerCase().trim();
    return this.ingredients()
      .filter((ingredient) => ingredient.name.toLowerCase().includes(search))
      .slice(0, 30);
  });

  selectedIngredient = computed(() => {
    const search = this.ingredientSearch().trim().toLowerCase();
    return this.ingredients().find((ingredient) => ingredient.name.toLowerCase() === search);
  });

  filteredCocktails = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const category = this.selectedCategory();
    const availableIngredients = new Set(this.availableIngredientKeys());
    const hasIngredientFilter = availableIngredients.size > 0;

    return this.cocktails()
      .map((cocktail): CocktailMatch => {
        const missingIngredients = cocktail.ingredients.filter(
          (item) => !availableIngredients.has(item.ingredient.key),
        ).length;

        return {
          cocktail,
          missingIngredients,
          isReady: hasIngredientFilter && missingIngredients === 0,
        };
      })
      .filter(({ cocktail, missingIngredients }) => {
        const matchesSearch =
          cocktail.name.toLowerCase().includes(search) ||
          cocktail.description.toLowerCase().includes(search);

        const matchesCategory = category === 'All' || cocktail.category === category;
        const matchesIngredients =
          !hasIngredientFilter ||
          (cocktail.ingredients.length > 0 &&
            missingIngredients < cocktail.ingredients.length);

        return matchesSearch && matchesCategory && matchesIngredients;
      })
      .sort((first, second) =>
        hasIngredientFilter ? first.missingIngredients - second.missingIngredients : 0,
      );
  });

  constructor() {
    void this.cocktailService.loadLibrary();
  }

  addIngredient(key: string): void {
    if (!key || this.availableIngredientKeys().includes(key)) {
      return;
    }

    this.cocktailService.addAvailableIngredient(key);
    this.ingredientSearch.set('');
  }

  addSelectedIngredient(): void {
    const ingredient = this.selectedIngredient();
    if (ingredient) {
      this.addIngredient(ingredient.key);
    }
  }

  removeIngredient(key: string): void {
    this.cocktailService.removeAvailableIngredient(key);
  }

  ingredientName(key: string): string {
    return this.ingredients().find((ingredient) => ingredient.key === key)?.name ?? key;
  }
}
