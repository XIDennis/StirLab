import { Component, signal, computed } from '@angular/core';
import { CocktailCard } from './components/cocktail-card/cocktail-card';

interface Cocktail {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-root',
  imports: [CocktailCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'StirLab';
  subtitle = 'Discover your next favourite cocktail.';

  categories = ['All', 'Refreshing', 'Sour', 'Bitter'];

  cocktails: Cocktail[] = [
    {
      id: 1,
      name: 'Mojito',
      category: 'Refreshing',
      image: 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg',
      description: 'A refreshing Cuban cocktail with rum, lime, mint and soda water.',
    },
    {
      id: 2,
      name: 'Margarita',
      category: 'Sour',
      image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
      description: 'A classic tequila cocktail with lime juice and orange liqueur.',
    },
    {
      id: 3,
      name: 'Negroni',
      category: 'Bitter',
      image: 'https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg',
      description: 'An Italian classic made with gin, vermouth and Campari.',
    },
    {
      id: 4,
      name: 'Daiquiri',
      category: 'Sour',
      image: 'https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg',
      description: 'A simple Cuban cocktail made with rum, lime and sugar.',
    },
  ];

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
