import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CocktailService } from '../../services/cocktail';

@Component({
  selector: 'app-ingredient-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  readonly suggestionsOpen = signal(false);

  private readonly searchable = computed(() =>
    this.ingredients().map((i) => ({ ...i, lower: i.name.toLowerCase() })),
  );

  private readonly nameByKey = computed(
    () => new Map(this.ingredients().map((i) => [i.key, i.name])),
  );

  private readonly availableKeySet = computed(() => new Set(this.availableIngredientKeys()));

  readonly containsAllBasicIngredients = computed(() =>
    this.basicIngredientKeys.every((k) => this.availableKeySet().has(k)),
  );

  readonly basicIngredientKeys: string[] = [
    'water',
    'sugar',
    'salt',
    'simple-syrup',
    'sugar-syrup',
    'soda-water',
    'lemon',
    'lemon-juice',
    'ice',
    'coffe',
    'cinnamon',
    'cola',
    'egg',
  ];

  readonly matchingIngredients = computed(() => {
    const search = this.ingredientSearch().toLowerCase().trim();
    if (!search) return [];
    return this.searchable()
      .filter((i) => i.lower.includes(search) && !this.availableKeySet().has(i.key))
      .slice(0, 8);
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
    return this.nameByKey().get(key) ?? key;
  }

  setShowUnavailable(event: Event): void {
    this.showUnavailableChange.emit((event.target as HTMLInputElement).checked);
  }

  addAllBasicIngredients(): void {
    for (const ingredient of this.basicIngredientKeys) {
      this.cocktailService.addAvailableIngredient(ingredient);
    }
  }
  removeAllIngredients(): void {
    for (const key of this.availableIngredientKeys()) {
      this.cocktailService.removeAvailableIngredient(key);
    }
  }

  blurSearchOnOutsideClick(event: Event, input: HTMLInputElement): void {
    if (event.target !== input) {
      input.blur();
    }
  }

  selectIngredient(key: string): void {
    this.cocktailService.addAvailableIngredient(key);
    this.ingredientSearch.set('');
    this.suggestionsOpen.set(false);
  }
}
