import { Component, signal, computed, inject, effect } from '@angular/core';
import { CocktailCard } from '../../components/cocktail-card/cocktail-card';
import { Cocktail } from '../../models/cocktail';
import { CocktailService } from '../../services/cocktail';
import { CocktailSearch } from '../../components/cocktail-search/cocktail-search';
import { CategoryFilter } from '../../components/category-filter/category-filter';
import { IngredientPicker } from '../../components/ingredient-picker/ingredient-picker';

interface CocktailMatch {
  cocktail: Cocktail;
  availableIngredients: number;
  missingIngredients: number;
  isReady: boolean;
  isUnavailable: boolean;
  isPopular: boolean;
}

@Component({
  selector: 'app-home',
  imports: [CocktailCard, CocktailSearch, CategoryFilter, IngredientPicker],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  title = 'StirLab';
  subtitle = 'Discover your next favourite cocktail.';

  readonly cocktailService = inject(CocktailService);

  cocktails = this.cocktailService.cocktails;
  searchTerm = signal('');

  selectedCategory = signal('All');

  availableIngredientKeys = this.cocktailService.availableIngredientKeys;

  showUnavailableCocktails = signal(false);

  showAllIngredients = signal<boolean>(localStorage.getItem('showAllIngredients') === 'true');
  showPopularCocktailsOnly = signal<boolean>(
    localStorage.getItem('showPopularCocktailsOnly') === 'true',
  );

  categories = computed(() => [
    'All',
    ...new Set(this.cocktails().map((cocktail) => cocktail.category)),
  ]);

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
          isPopular: cocktail.popular,
        };
      })
      .filter(({ cocktail, missingIngredients }) => {
        const matchesSearch = cocktail.name.toLowerCase().includes(search);
        const matchesCategory = category === 'All' || cocktail.category === category;
        const matchesPopularFilter =
          (this.showPopularCocktailsOnly() && cocktail.popular) || !this.showPopularCocktailsOnly();
        const matchesIngredients =
          !hasIngredientFilter ||
          (cocktail.ingredients.length > 0 &&
            (missingIngredients < cocktail.ingredients.length || this.showUnavailableCocktails()));

        return matchesSearch && matchesCategory && matchesIngredients && matchesPopularFilter;
      })
      .sort((first, second) => {
        if (!hasIngredientFilter) {
          return first.cocktail.popular === second.cocktail.popular
            ? 0
            : first.cocktail.popular
              ? -1
              : 1;
        }

        // 1. Push unavailable cocktails (0 matching ingredients) to the very bottom
        if (first.isUnavailable !== second.isUnavailable) {
          return first.isUnavailable ? 1 : -1;
        }

        // 2. Sort by least missing ingredients first
        if (first.missingIngredients !== second.missingIngredients) {
          return first.missingIngredients - second.missingIngredients;
        }

        // 3. TIE-BREAKER: If missing ingredients are equal, popular cocktails come first
        if (first.cocktail.popular && !second.cocktail.popular) return -1;
        if (!first.cocktail.popular && second.cocktail.popular) return 1;

        return 0;
      });
  });

  constructor() {
    void this.cocktailService.loadLibrary();
    effect(() => {
      localStorage.setItem('showPopularCocktailsOnly', String(this.showPopularCocktailsOnly()));
    });
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
