import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Cocktail, CocktailIngredient, Ingredient } from '../models/cocktail';

interface CocktailDbSummary {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface CocktailDbResponse {
  drinks: CocktailDbDetails[] | null;
}

interface CocktailDbDetails extends CocktailDbSummary {
  strCategory: string | null;
  strInstructions: string | null;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  private readonly apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';
  private readonly http = inject(HttpClient);
  private loadingPromise: Promise<void> | undefined;

  readonly cocktails = signal<Cocktail[]>([]);
  readonly ingredients = signal<Ingredient[]>([]);
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

  private async fetchLibrary(): Promise<void> {
    this.isLoading.set(true);
    this.error.set('');

    try {
      const details = await this.fetchDetails();
      const cocktails = details.map((detail) => this.mapCocktail(detail));
      const ingredients = this.createIngredientLibrary(cocktails);

      this.cocktails.set(cocktails);
      this.ingredients.set(ingredients);
      if (!cocktails.length) {
        this.error.set('The cocktail library returned no recipes. Please try again.');
      }
    } catch (error) {
      console.error('Unable to load cocktail library from TheCocktailDB.', error);
      this.error.set('The cocktail library could not be loaded. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private async fetchDetails(): Promise<CocktailDbDetails[]> {
    const results = await Promise.allSettled(
      'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) =>
        firstValueFrom(
          this.http.get<CocktailDbResponse>(`${this.apiUrl}/search.php?f=${letter}`),
        ),
      ),
    );

    const details = results.flatMap((result) =>
      result.status === 'fulfilled' ? (result.value.drinks ?? []) : [],
    );
    return [...new Map(details.map((cocktail) => [cocktail.idDrink, cocktail])).values()];
  }

  private mapCocktail(details: CocktailDbDetails): Cocktail {
    const ingredients: CocktailIngredient[] = [];
    for (let index = 1; index <= 15; index += 1) {
      const name = details[`strIngredient${index}`]?.trim();
      if (!name) {
        continue;
      }

      ingredients.push({
        ingredient: {
          key: this.normalizeIngredient(name),
          name,
        },
        measure: details[`strMeasure${index}`]?.trim() ?? '',
      });
    }

    return {
      id: details.idDrink,
      name: details.strDrink,
      category: details.strCategory?.trim() || 'Other',
      image: details.strDrinkThumb,
      description: details.strInstructions?.split('. ')[0] || 'A classic cocktail recipe.',
      ingredients,
      instructions: details.strInstructions
        ? details.strInstructions.split(/\.\s+/).filter(Boolean).map((instruction) =>
            instruction.endsWith('.') ? instruction : `${instruction}.`,
          )
        : [],
    };
  }

  private createIngredientLibrary(cocktails: Cocktail[]): Ingredient[] {
    const ingredients = new Map<string, Ingredient>();
    for (const cocktail of cocktails) {
      for (const item of cocktail.ingredients) {
        ingredients.set(item.ingredient.key, item.ingredient);
      }
    }
    return [...ingredients.values()].sort((first, second) =>
      first.name.localeCompare(second.name),
    );
  }

  private normalizeIngredient(name: string): string {
    return name
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, '-');
  }

}
