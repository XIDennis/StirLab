export interface Ingredient {
  key: string;
  name: string;
}

export interface CocktailIngredient {
  ingredient: Ingredient;
  measure: string;
}

export interface Cocktail {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  ingredients: CocktailIngredient[];
  instructions: string[];
}
