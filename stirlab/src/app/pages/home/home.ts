import { Component, signal, computed, inject } from '@angular/core';
import { CocktailCard } from '../../components/cocktail-card/cocktail-card';
import { Cocktail } from '../../models/cocktail';
import { CocktailService } from '../../services/cocktail';

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

  availableIngredientKeys = signal<string[]>([]);

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

    return this.cocktails().filter((cocktail) => {
      const matchesSearch =
        cocktail.name.toLowerCase().includes(search) ||
        cocktail.description.toLowerCase().includes(search);

      const matchesCategory = category === 'All' || cocktail.category === category;
      const matchesIngredients =
        availableIngredients.size === 0 ||
        cocktail.ingredients.every((item) => availableIngredients.has(item.ingredient.key));

      return matchesSearch && matchesCategory && matchesIngredients;
    });
  });

  constructor() {
    void this.cocktailService.loadLibrary();
  }

  addIngredient(key: string): void {
    if (!key || this.availableIngredientKeys().includes(key)) {
      return;
    }

    this.availableIngredientKeys.update((ingredients) => [...ingredients, key]);
    this.ingredientSearch.set('');
  }

  addSelectedIngredient(): void {
    const ingredient = this.selectedIngredient();
    if (ingredient) {
      this.addIngredient(ingredient.key);
    }
  }

  removeIngredient(key: string): void {
    this.availableIngredientKeys.update((ingredients) =>
      ingredients.filter((ingredient) => ingredient !== key),
    );
  }

  ingredientName(key: string): string {
    return this.ingredients().find((ingredient) => ingredient.key === key)?.name ?? key;
  }
}
