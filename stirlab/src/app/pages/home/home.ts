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

  categories = ['All', 'Refreshing', 'Sour', 'Bitter'];
  private cocktailService = inject(CocktailService);

  cocktails: Cocktail[] = this.cocktailService.getCocktails();

  searchTerm = signal('');

  selectedCategory = signal('All');

  filteredCocktails = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const category = this.selectedCategory();

    return this.cocktails.filter((cocktail) => {
      const matchesSearch =
        cocktail.name.toLowerCase().includes(search) ||
        cocktail.description.toLowerCase().includes(search);

      const matchesCategory = category === 'All' || cocktail.category === category;

      return matchesSearch && matchesCategory;
    });
  });
}
