const { log } = require('console');
const fs = require('fs');

// 1. Read the JSON file
const data = JSON.parse(fs.readFileSync('stirlab/public/cocktails.json', 'utf8'));

const descriptions = [
  {
    name: 'Americano',
    desc: 'A refreshing, bittersweet Italian aperitif highball built over ice with equal parts Campari and sweet vermouth, topped with sparkling club soda and garnished with an orange slice. Originally created in Milan in the 1860s, it serves as the lighter, lower-ABV predecessor to the Negroni.',
  },
  {
    name: 'Aviation',
    desc: 'A classic pre-Prohibition floral and citrusy gin cocktail shaken with maraschino liqueur, crème de violette, and fresh lemon juice. Known for its pale lavender-sky hue and delicate balance of tart, sweet, and botanical notes, it is traditionally served straight up with a brandied cherry.',
  },
  {
    name: 'B-52',
    desc: 'A visually striking, rich layered shooter made by carefully floating coffee liqueur (Kahlúa), Irish cream (Baileys), and orange liqueur (Grand Marnier) in distinct tiers. Smooth, sweet, and decadent, it delivers a dessert-like combination of roasted coffee, cream, and bright citrus.',
  },
  {
    name: 'Bellini',
    desc: "A light, fruity Italian sparkling cocktail originating from Harry's Bar in Venice, blending chilled Prosecco with fresh white peach purée. Effervescent and delicately sweet, it is a staple celebratory drink for brunches and warm afternoons.",
  },
  {
    name: 'Bramble',
    desc: 'A modern British gin sour created in London in the 1980s, combining gin, fresh lemon juice, and simple syrup over crushed ice, finished with a vibrant drizzle of blackberry liqueur (crème de mûre). The liqueur slowly bleeds through the ice, creating a striking marbled look and a tart-yet-berry-rich flavor.',
  },
  {
    name: 'Caipirinha',
    desc: "Brazil's national cocktail, crafted by muddling fresh lime wedges and cane sugar together before shaking or stirring with cachaça, a grassy, unaged sugarcane spirit. Bright, punchy, and refreshingly rustic, it highlights the earthy, funky character of Brazilian cachaça.",
  },
  {
    name: 'Corpse Reviver',
    desc: "A crisp, herbal gin-based 'hair of the dog' classic—most famously the #2 recipe—shaken with equal parts gin, Cointreau, Lillet Blanc, and fresh lemon juice, served in an absinthe-rinsed coupe. Sharp, aromatic, and revitalizing, it balances bright citrus with subtle anise and botanical bitterness.",
  },
  {
    name: 'Cosmopolitan',
    desc: 'A vibrant pink vodka cocktail made famous in the 1990s, shaken with orange liqueur (Cointreau), cranberry juice, and fresh lime juice, and served up in a chilled martini glass. Crisp, tart, and subtly sweet, it is typically finished with an expressed orange peel.',
  },
  {
    name: 'Cuba Libre',
    desc: 'A simple yet iconic highball combining light or aged rum and cola over ice, elevated by a generous squeeze of fresh lime juice. Created in Havana around 1900 to celebrate Cuban independence, the bright acidity of the lime cuts through the sweetness of the cola for a crisp finish.',
  },
  {
    name: 'Daiquiri',
    desc: "A clean, perfectly balanced Cuban sour combining white rum, fresh-squeezed lime juice, and simple syrup, shaken hard and strained into a chilled coupe. Despite its modern association with frozen blended drinks, the classic Daiquiri is a benchmark test of a bartender's precision and balance.",
  },
  {
    name: 'Dark and Stormy',
    desc: "Bermuda's national drink, consisting of spicy ginger beer and fresh lime juice served over ice, topped with a dramatic float of dark Goslings Black Seal rum. As the rich, molasses-heavy rum slowly mixes into the fiery ginger beer, it creates a bold, warming, and refreshing highball.",
  },
  {
    name: 'Dry Martini',
    desc: 'An iconic, icy-cold cocktail stirred with gin and a minimal splash of dry vermouth, strained into a chilled cocktail glass and garnished with a green olive or a lemon twist. Crisp, botanical, and unapologetically spirit-forward, it is the gold standard of classic cocktail sophistication.',
  },
  {
    name: 'Espresso Martini',
    desc: 'A rich, energizing modern classic created by Dick Bradsell in London, hard-shaken with vodka, coffee liqueur, simple syrup, and a shot of freshly brewed espresso. The vigorous shake creates a signature velvety crema foam on top, garnished traditionally with three coffee beans.',
  },
  {
    name: 'French 75',
    desc: 'A celebratory, effervescent cocktail combining gin, fresh lemon juice, and simple syrup, strained into a champagne flute and topped with chilled Champagne. Named after a fast-firing World War I French field gun, it pairs bright botanical citrus with crisp, bubbly elegance.',
  },
  {
    name: 'French Connection',
    desc: 'A rich, spirit-forward two-ingredient sipper stirred over ice with equal parts Cognac and amaretto liqueur. Smooth, warming, and aromatic, the dried-fruit richness of the French brandy pairs seamlessly with the sweet, nutty almond notes of the Italian liqueur.',
  },
  {
    name: 'French Martini',
    desc: 'A smooth, fruity modern classic from the late 1980s, shaken with vodka, black raspberry liqueur (Chambord), and fresh pineapple juice. Known for its lush berry-tropical sweetness and thick, frothy pineapple foam, it is served straight up in a chilled martini glass.',
  },
  {
    name: 'Gimlet',
    desc: "A sharp, refreshing cocktail made simply with gin (or occasionally vodka) and sweetened lime juice—traditionally Rose's lime cordial, though modern versions often use fresh lime and simple syrup. Originally devised to help British Royal Navy sailors stave off scurvy, it is brisk, zesty, and clean.",
  },
  {
    name: 'Irish Coffee',
    desc: 'A warming, comforting cocktail made with hot brewed coffee, Irish whiskey, and brown sugar, topped with a thick layer of lightly whipped heavy cream floated over the back of a spoon. Designed to be sipped through the cool, velvety cream, it offers a rich blend of roasted, sweet, and malty flavors.',
  },
  {
    name: 'Kamikaze',
    desc: 'A tart, punchy equal-parts mix of vodka, triple sec, and fresh lime juice, shaken with ice and served either as a chilled shot or strained over rocks. Crisp and intensely citrus-forward, it shares the exact template of a Margarita or Sidecar but uses vodka as a clean neutral base.',
  },
  {
    name: 'Lemon Drop',
    desc: 'A bright, sweet-and-sour vodka cocktail shaken with triple sec, fresh lemon juice, and simple syrup, strained into a chilled martini glass with a sugar-coated rim. Inspired by the classic lemon drop candy, it delivers a burst of zesty citrus balanced by a crisp, sugary finish.',
  },
  {
    name: 'Long Island Iced Tea',
    desc: 'A notoriously potent highball mixing equal parts vodka, gin, white rum, silver tequila, and triple sec with lemon juice, simple syrup, and a splash of cola for color. Despite containing no actual tea, the combination of citrus, sweetness, and cola remarkably mimics iced tea while masking its high alcohol content.',
  },
  {
    name: 'Long Island Tea',
    desc: 'An alternate name for the Long Island Iced Tea—a high-proof party highball blending five white spirits (vodka, gin, rum, tequila, and triple sec) with sweet-and-sour citrus and a splash of cola. Smooth, deceptively easy to drink, and famously strong, it is served over plenty of ice with a lemon wedge.',
  },
  {
    name: 'Mai Tai',
    desc: 'A quintessential tiki cocktail created by Trader Vic in 1944, combining aged Jamaican and Martinique rums with orange curaçao, fresh lime juice, and almond-flavored orgeat syrup. Complex, nutty, and vibrantly citrusy, it showcases rich rum character rather than heavy fruit juices.',
  },
  {
    name: 'Manhattan',
    desc: 'A bold, timeless stirred cocktail crafted with rye or bourbon whiskey, sweet Italian vermouth, and dashes of aromatic Angostura bitters, served up with a dark brandied cherry. Rich, spicy, and subtly bittersweet, it is one of the foundational classics of American mixology.',
  },
  {
    name: 'Margarita',
    desc: "A zesty Mexican classic shaking blanco or reposado tequila, orange liqueur (Cointreau or triple sec), and fresh lime juice, typically served in a glass with a salted rim. The interplay of earthy agave, bright citrus, and savory salt makes it one of the world's most popular cocktails.",
  },
  {
    name: 'Martini',
    desc: 'An iconic, timeless cocktail stirred (or shaken) to freezing temperatures with gin or vodka and dry vermouth, served straight up in a stemmed glass. Clean, crisp, and endlessly customizable—from wet to bone-dry, dirty with olive brine, or garnished with a twist—it defines classic bar culture.',
  },
  {
    name: 'Mimosa',
    desc: 'A classic brunch cocktail mixing equal parts chilled Champagne (or dry sparkling wine) and fresh-squeezed orange juice in a tall flute. Light, bubbly, and effortlessly refreshing, it balances the crisp acidity of sparkling wine with bright citrus sweetness.',
  },
  {
    name: 'Mint Julep',
    desc: 'A refreshing Southern classic and the official drink of the Kentucky Derby, made by gently muddling fresh spearmint leaves with sugar or simple syrup, bourbon, and mountains of finely crushed ice. Served traditionally in a frosted silver or pewter cup, it is intensely aromatic and cooling.',
  },
  {
    name: 'Mojito',
    desc: 'A crisp Cuban highball made by gently muddling fresh mint leaves, fresh lime juice, and cane sugar with white rum, served over ice and topped with sparkling club soda. Bright, herbaceous, and effortlessly thirst-quenching, it is a quintessential warm-weather refresher.',
  },
  {
    name: 'Moscow Mule',
    desc: "A zesty, refreshing cocktail combining vodka, fiery ginger beer, and fresh lime juice over ice, traditionally served in an iconic chilled copper mug. Invented in the 1940s to popularize vodka in America, the copper mug keeps the drink frosty while amplifying the ginger's spicy kick.",
  },
  {
    name: 'Negroni',
    desc: 'A bold, bittersweet Italian aperitif stirred with equal parts gin, Campari, and sweet red vermouth, served over a large ice cube with an expressed orange peel. Herbal, complex, and deeply ruby-red, it balances botanical juniper, bitter orange peel, and rich spiced wine.',
  },
  {
    name: 'Old Fashioned',
    desc: 'The foundational whiskey cocktail, crafted by dissolving sugar with dashes of Angostura bitters and a splash of water before stirring with bourbon or rye whiskey over ice and garnishing with an orange twist. Spirit-forward, smooth, and aromatic, it highlights the oak and spice of the base whiskey.',
  },
  {
    name: 'Paloma',
    desc: "A crisp, bittersweet Mexican highball combining blanco or reposado tequila and fresh lime juice over ice, topped with sparkling grapefruit soda (such as Jarritos or Squirt) in a salt-rimmed glass. Lighter and more effervescent than a Margarita, it is Mexico's favorite everyday tequila refresher.",
  },
  {
    name: 'Penicillin',
    desc: 'A modern classic created by Sam Ross in New York, shaking blended Scotch whisky, fresh lemon juice, and honey-ginger syrup, then finishing with an aromatic float of heavily peated Islay single malt. Warming, spicy, tart, and smoky, it drinks like an elevated, sophisticated hot toddy on the rocks.',
  },
  {
    name: 'Pina Colada',
    desc: 'A creamy, tropical blended cocktail originating from Puerto Rico, combining white rum, rich coconut cream (Coco López), and sweet pineapple juice with crushed ice. Lush, velvety, and unabashedly vacation-ready, it is garnished with a pineapple wedge and a maraschino cherry.',
  },
  {
    name: 'Pisco Sour',
    desc: 'A frothy South American classic shaking Peruvian or Chilean pisco (an unaged grape brandy) with fresh lime juice, simple syrup, and egg white, finished with drops of Angostura bitters on the foam. Silky, tangy, and aromatic, the bitters cut through the rich meringue-like cap with warm spice.',
  },
  {
    name: "Planter's Punch",
    desc: "A classic Jamaican tiki highball featuring bold dark Jamaican rum, fresh lime juice, cane sugar, and splashes of tropical fruit juices, bitters, or grenadine over crushed ice. Rich, funky, and deeply spiced, it embodies the classic Caribbean rum punch formula of 'one of sour, two of sweet, three of strong, four of weak.'",
  },
  {
    name: "Planter's Punch",
    desc: "A classic Jamaican tiki highball featuring bold dark Jamaican rum, fresh lime juice, cane sugar, and splashes of tropical fruit juices, bitters, or grenadine over crushed ice. Rich, funky, and deeply spiced, it embodies the classic Caribbean rum punch formula of 'one of sour, two of sweet, three of strong, four of weak.'",
  },
  {
    name: 'Pornstar Martini',
    desc: 'A vibrant, indulgent modern classic created by Douglas Ankrah in London, shaking vanilla vodka, passion fruit liqueur (Passoã), fresh passion fruit purée, and lime juice. Served in a chilled coupe with half a passion fruit floating on top and a side shot of chilled Prosecco to sip alongside.',
  },
  {
    name: 'Rusty Nail',
    desc: 'A warming, herbal two-ingredient cocktail stirred over ice with Scotch whisky and Drambuie, a golden liqueur made from aged Scotch, heather honey, herbs, and spices. Smooth, smoky, and richly honeyed, it serves as an effortless yet complex after-dinner sipper.',
  },
  {
    name: 'Sangria',
    desc: 'A festive, fruity Spanish wine punch traditionally combining bold red wine (such as Rioja) with brandy, orange liqueur, chopped fresh citrus and apples, and a touch of sweetener. Chilled and allowed to macerate so the fruit infuses the wine, it is often topped with soda water for a crisp finish.',
  },
  {
    name: 'Sazerac',
    desc: "New Orleans' official cocktail and one of America's oldest, stirring rye whiskey (or Cognac) with a sugar cube and Peychaud's bitters, then straining neat into an old-fashioned glass rinsed with absinthe. Aromatic, spicy, and subtly anise-scented, it is finished with an expressed lemon peel discarded or perched on the rim.",
  },
  {
    name: 'Screwdriver',
    desc: 'A simple, effortless two-ingredient highball made by pouring vodka and fresh-squeezed orange juice over ice in a tall glass. Crisp, sunny, and easy-drinking, its quality relies entirely on using fresh, vibrant orange juice.',
  },
  {
    name: 'Sea breeze',
    desc: 'A tart, crisp summer highball built over ice with vodka, cranberry juice, and tangy grapefruit juice, garnished with a lime wheel. Refreshing and lightly bitter-sweet, it delivers a bright, Ruby-red citrus punch that is lighter than a Cape Codder.',
  },
  {
    name: 'Sidecar',
    desc: 'A classic, bright sour cocktail shaken with Cognac, orange liqueur (Cointreau), and fresh lemon juice, strained into a chilled coupe often lined with a half-rim of sugar. Dating back to post-World War I Paris and London, it balances rich grape brandy with crisp, bracing citrus.',
  },
  {
    name: 'Tequila Sunrise',
    desc: 'A visually dramatic layered highball made by pouring tequila and orange juice over ice, then slowly drizzling sweet red grenadine down the inside of the glass so it sinks and bleeds upward. Sweet, fruity, and evocative of a summer dawn, it is garnished with an orange slice and cherry.',
  },
  {
    name: 'Tom Collins',
    desc: 'A refreshing, sparkling gin sour made by shaking or building gin, fresh lemon juice, and simple syrup over ice in a tall Collins glass, topped with crisp club soda. Light, bubbly, and essentially a grown-up sparkling lemonade, it is garnished with a lemon wheel and cherry.',
  },
  {
    name: 'Whiskey Sour',
    desc: 'A smooth, timeless classic shaking bourbon whiskey, fresh lemon juice, simple syrup, and an optional egg white for a lush, velvety foam. Perfectly balancing rich caramel-oak notes with bright tartness, it is traditionally garnished with a maraschino cherry and an orange half-wheel.',
  },
];

// 2. Loop specifically through the 'cocktails' array
data.cocktails.forEach((cocktail) => {
  if (cocktail.popular) {
    cocktail.description = descriptions.find((d) => {
      if (d.name === cocktail.name) return true;
    }).desc;

    //console.log(cocktail.name);

    //console.log(cocktail.description);
  }
});

// 3. Save the entire object back to a file
// generatedAt and ingredients remain untouched
fs.writeFileSync('stirlab/public/cocktails_updated.json', JSON.stringify(data, null, 2));

console.log('Update complete!');
