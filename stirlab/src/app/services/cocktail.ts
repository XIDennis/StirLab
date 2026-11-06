import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Cocktail, CocktailIngredient, Ingredient } from '../models/cocktail';

interface CocktailLibrary {
  generatedAt: string;
  cocktails: Cocktail[];
  ingredients: Ingredient[];
}

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  private readonly availableIngredientsStorageKey = 'stirlab.available-ingredients';
  private readonly http = inject(HttpClient);
  private loadingPromise: Promise<void> | undefined;

  readonly cocktails = signal<Cocktail[]>([]);
  readonly ingredients = signal<Ingredient[]>([]);
  readonly availableIngredientKeys = signal<string[]>(this.readAvailableIngredients());
  readonly isLoading = signal(false);
  readonly error = signal('');

  async loadLibrary(): Promise<void> {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = this.fetchLibrary();
    try {
      await this.loadingPromise;
    } finally {
      this.loadingPromise = undefined;
    }
  }

  async getCocktailById(id: string): Promise<Cocktail | undefined> {
    await this.loadLibrary();
    return this.cocktails().find((cocktail) => cocktail.id === id);
  }

  addAvailableIngredient(key: string): void {
    if (!key || this.availableIngredientKeys().includes(key)) {
      return;
    }

    this.availableIngredientKeys.update((ingredients) => {
      const updatedIngredients = [...ingredients, key];
      this.persistAvailableIngredients(updatedIngredients);
      return updatedIngredients;
    });
  }

  removeAvailableIngredient(key: string): void {
    this.availableIngredientKeys.update((ingredients) => {
      const updatedIngredients = ingredients.filter((ingredient) => ingredient !== key);
      this.persistAvailableIngredients(updatedIngredients);
      return updatedIngredients;
    });
  }

  private readonly dataUrl = 'cocktails_temp_allalc.json';

  private async fetchLibrary(): Promise<void> {
    this.isLoading.set(true);
    this.error.set('');

    try {
      const library = await firstValueFrom(this.http.get<CocktailLibrary>(this.dataUrl));

      this.cocktails.set(library.cocktails);
      this.ingredients.set(library.ingredients);
      if (!library.cocktails.length) {
        this.error.set('The cocktail library returned no recipes. Please try again.');
      }
    } catch (error) {
      console.error('Unable to load the cocktail library.', error);
      this.error.set('The cocktail library could not be loaded. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private readAvailableIngredients(): string[] {
    try {
      const storedIngredients = localStorage.getItem(this.availableIngredientsStorageKey);
      if (!storedIngredients) {
        return [];
      }

      const parsed: unknown = JSON.parse(storedIngredients);
      return Array.isArray(parsed) && parsed.every((ingredient) => typeof ingredient === 'string')
        ? parsed
        : [];
    } catch (error) {
      console.error('Unable to read saved ingredients.', error);
      return [];
    }
  }

  private persistAvailableIngredients(ingredients: string[]): void {
    try {
      localStorage.setItem(this.availableIngredientsStorageKey, JSON.stringify(ingredients));
    } catch (error) {
      console.error('Unable to save selected ingredients.', error);
    }
  }
}
export type { Cocktail };
