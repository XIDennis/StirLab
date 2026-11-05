import { Component, inject } from '@angular/core';
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

  cocktail: Cocktail | undefined = this.cocktailService.getCocktailById(
    Number(this.route.snapshot.paramMap.get('id')),
  );
}
