// npm run build:data
// WARNING
// Running new build currently deletes all manually added entries that are
// not in the DB data is pulled from

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const API = 'https://www.thecocktaildb.com/api/json/v1/1';
const OUTPUT = 'public/cocktails.json'; // use 'src/assets/cocktails.json' on older Angular projects
const LETTERS = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchLetter(letter, attempts = 3) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(`${API}/search.php?f=${letter}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const body = await response.json();
      return body.drinks ?? [];
    } catch (error) {
      if (attempt === attempts) {
        throw new Error(`Letter "${letter}" failed: ${error.message}`);
      }
      await sleep(500 * attempt);
    }
  }
}

function normalizeIngredient(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, '-');
}

function mapCocktail(details) {
  const ingredients = [];
  for (let index = 1; index <= 15; index += 1) {
    const name = details[`strIngredient${index}`]?.trim();
    if (!name) continue;
    ingredients.push({
      ingredient: { key: normalizeIngredient(name), name },
      measure: details[`strMeasure${index}`]?.trim() ?? '',
    });
  }

  const instructions = details.strInstructions
    ? details.strInstructions
        .split(/\.\s+/)
        .filter(Boolean)
        .map((step) => (step.endsWith('.') ? step : `${step}.`))
    : [];

  return {
    id: details.idDrink,
    name: details.strDrink,
    category: details.strCategory?.trim() || 'Other',
    image: details.strDrinkThumb,
    description: details.strInstructions?.split('. ')[0] || 'A classic cocktail recipe.',
    ingredients,
    instructions,
  };
}

function buildIngredientLibrary(cocktails) {
  const map = new Map();
  for (const cocktail of cocktails) {
    for (const item of cocktail.ingredients) {
      map.set(item.ingredient.key, item.ingredient);
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

async function main() {
  const drinks = new Map();
  for (const letter of LETTERS) {
    const results = await fetchLetter(letter); // any failure aborts the whole run
    for (const drink of results) drinks.set(drink.idDrink, drink);
    console.log(`${letter}: ${results.length} drinks`);
    await sleep(200);
  }

  const cocktails = [...drinks.values()]
    .map(mapCocktail)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (!cocktails.length) throw new Error('No cocktails fetched; not writing file.');

  const library = {
    generatedAt: new Date().toISOString(),
    cocktails,
    ingredients: buildIngredientLibrary(cocktails),
  };

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, JSON.stringify(library));
  console.log(
    `Wrote ${cocktails.length} cocktails and ${library.ingredients.length} ingredients to ${OUTPUT}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
