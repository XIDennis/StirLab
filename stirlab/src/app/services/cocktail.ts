import { Injectable } from '@angular/core';
import { Cocktail } from '../models/cocktail';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  private cocktails: Cocktail[] = [
    {
      id: 1,
      name: 'Mojito',
      category: 'Refreshing',
      image: 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg',
      description: 'A refreshing Cuban cocktail with rum, lime, mint and soda water.',
      ingredients: [
        '50 ml white rum',
        '25 ml lime juice',
        '2 teaspoons sugar',
        '6-8 mint leaves',
        'Soda water',
        'Crushed ice',
      ],
      instructions: [
        'Add mint leaves, sugar and lime juice to a glass.',
        'Gently muddle the ingredients.',
        'Add white rum and crushed ice.',
        'Top with soda water and stir gently.',
        'Garnish with mint leaves and serve.',
      ],
    },
    {
      id: 2,
      name: 'Margarita',
      category: 'Sour',
      image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
      description: 'A classic tequila cocktail with lime juice and orange liqueur.',
      ingredients: [
        '50 ml tequila blanco',
        '25 ml Cointreau',
        '25 ml lime juice',
        'Ice',
        'Salt for the rim',
      ],
      instructions: [
        'Prepare a salt rim on your glass.',
        'Add tequila, Cointreau and lime juice to a shaker.',
        'Fill with ice and shake vigorously.',
        'Strain into your prepared glass.',
      ],
    },
    {
      id: 3,
      name: 'Negroni',
      category: 'Bitter',
      image: 'https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg',
      description: 'An Italian classic made with gin, vermouth and Campari.',
      ingredients: ['30 ml gin', '30 ml Campari', '30 ml sweet vermouth', 'Ice', 'Orange slice'],
      instructions: [
        'Add gin, Campari and sweet vermouth to a mixing glass.',
        'Fill with ice and stir until chilled.',
        'Strain over fresh ice.',
        'Garnish with an orange slice.',
      ],
    },
    {
      id: 4,
      name: 'Daiquiri',
      category: 'Sour',
      image: 'https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg',
      description: 'A simple Cuban cocktail made with rum, lime and sugar.',
      ingredients: ['60 ml white rum', '25 ml lime juice', '15 ml simple syrup', 'Ice'],
      instructions: [
        'Add rum, lime juice and simple syrup to a shaker.',
        'Fill with ice and shake vigorously.',
        'Double strain into a chilled cocktail glass.',
        'Serve immediately.',
      ],
    },
  ];

  getCocktails(): Cocktail[] {
    return this.cocktails;
  }

  getCocktailById(id: number): Cocktail | undefined {
    return this.cocktails.find((cocktail) => cocktail.id === id);
  }
}
