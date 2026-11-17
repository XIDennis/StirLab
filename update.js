const fs = require('fs');

// 1. Read the JSON file
const data = JSON.parse(fs.readFileSync('stirlab/public/cocktails_temp_allalc.json', 'utf8'));

// 2. Loop specifically through the 'cocktails' array
data.cocktails.forEach((cocktail) => {
  cocktail.description = '';
});

// 3. Save the entire object back to a file
// generatedAt and ingredients remain untouched
fs.writeFileSync('stirlab/public/cocktails_updated.json', JSON.stringify(data, null, 2));

console.log('Update complete!');
