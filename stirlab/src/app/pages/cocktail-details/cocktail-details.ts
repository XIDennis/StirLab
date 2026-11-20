import { Component, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CocktailService } from '../../services/cocktail';
import { Cocktail } from '../../models/cocktail';

@Component({
  selector: 'app-cocktail-details',
  imports: [RouterLink],
  templateUrl: './cocktail-details.html',
  styleUrl: './cocktail-details.css',
})
export class CocktailDetails {
  private route = inject(ActivatedRoute);
  private cocktailService = inject(CocktailService);
  private location = inject(Location);

  cocktail = signal<Cocktail | undefined>(undefined);
  isLoading = signal(true);

  availableIngredientKeys = this.cocktailService.availableIngredientKeys;
  keysSet = new Set(this.availableIngredientKeys());

  constructor() {
    void this.loadCocktail();
  }

  private async loadCocktail(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.isLoading.set(false);
      return;
    }

    this.cocktail.set(await this.cocktailService.getCocktailById(id));
    this.isLoading.set(false);
  }

  goBack(): void {
    this.location.back();
  }

  searchTag(): string | undefined {
    if (this.cocktail()?.category === 'Cocktail' || this.cocktail()?.category === 'Shot') {
      return this.cocktail()?.category;
    }
    return 'drink';
  }
}
