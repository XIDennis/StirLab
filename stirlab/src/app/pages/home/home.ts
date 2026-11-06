import { Component, signal, computed, inject } from '@angular/core';
import { CocktailCard } from '../../components/cocktail-card/cocktail-card';
import { Cocktail } from '../../models/cocktail';
import { CocktailService } from '../../services/cocktail';
import { CocktailSearch } from '../../components/cocktail-search/cocktail-search';
import { CategoryFilter } from '../../components/category-filter/category-filter';

interface CocktailMatch {
  cocktail: Cocktail;
  availableIngredients: number;
  missingIngredients: number;
  isReady: boolean;
  isUnavailable: boolean;
}

@Component({
  selector: 'app-home',
  imports: [CocktailCard, CocktailSearch, CategoryFilter],
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

  showUnavailableCocktails = signal(false);

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
        const availableIngredientCount = cocktail.ingredients.filter((item) =>
          availableIngredients.has(item.ingredient.key),
        ).length;
        const missingIngredients = cocktail.ingredients.filter(
          (item) => !availableIngredients.has(item.ingredient.key),
        ).length;

        return {
          cocktail,
          availableIngredients: availableIngredientCount,
          missingIngredients,
          isReady: hasIngredientFilter && missingIngredients === 0,
          isUnavailable: hasIngredientFilter && availableIngredientCount === 0,
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
            (missingIngredients < cocktail.ingredients.length || this.showUnavailableCocktails()));

        return matchesSearch && matchesCategory && matchesIngredients;
      })
      .sort((first, second) => {
        if (!hasIngredientFilter) return 0;

        // Push unavailable cocktails (0 matching ingredients) to the very bottom
        if (first.isUnavailable !== second.isUnavailable) {
          return first.isUnavailable ? 1 : -1;
        }

        // Sort the remaining cocktails by least missing ingredients first
        return first.missingIngredients - second.missingIngredients;
      });
  });

  constructor() {
    void this.cocktailService.loadLibrary();
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
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

  setShowUnavailable(event: Event): void {
    this.showUnavailableCocktails.set((event.target as HTMLInputElement).checked);
  }

  removeIngredient(key: string): void {
    this.cocktailService.removeAvailableIngredient(key);
  }

  ingredientName(key: string): string {
    return this.ingredients().find((ingredient) => ingredient.key === key)?.name ?? key;
  }
}
