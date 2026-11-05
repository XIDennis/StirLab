import { Component, inject, signal } from '@angular/core';
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

  cocktail = signal<Cocktail | undefined>(undefined);
  isLoading = signal(true);

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
}
