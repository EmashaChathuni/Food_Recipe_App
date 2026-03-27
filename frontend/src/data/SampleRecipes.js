const sampleRecipes = [
  // Instant Food - Noodles & Pasta
  {
    id: '1',
    title: 'Spicy Chicken Noodles',
    category: 'Instant Food',
    subcategory: 'Noodles & Pasta',
    prepTime: '20 mins',
    cookingTime: '15 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf1f?w=500&h=400&fit=crop',
    description: 'Quick and delicious noodles with spicy chicken sauce and fresh vegetables.',
    occasions: ['Quick Weeknight Dinners', 'Picnic Food Ideas'],
    ingredients: [
      '250g instant noodles',
      '200g cooked chicken, shredded',
      '2 tbsp soy sauce',
      '1 tbsp chili paste',
      '2 garlic cloves, minced',
      '1 cup mixed vegetables',
      '2 green chilies, sliced',
      '1 tbsp sesame oil',
      'Lime juice'
    ],
    steps: [
      'Boil water and cook noodles until al dente.',
      'In a wok, heat sesame oil and sauté garlic and chilies.',
      'Add chicken and vegetables, stir-fry for 2 minutes.',
      'Add soy sauce and chili paste, mix well.',
      'Toss in cooked noodles and combine.',
      'Finish with lime juice and serve hot.'
    ],
    servings: 2
  },
  // Instant Food - Snacks & Sides
  {
    id: '2',
    title: 'Quick Deviled Potatoes',
    category: 'Instant Food',
    subcategory: 'Snacks & Sides',
    prepTime: '15 mins',
    cookingTime: '20 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1596103442097-8f74e88f2d7d?w=500&h=400&fit=crop',
    description: 'Spicy and tangy potato side dish, ready in 35 minutes.',
    occasions: ['Birthday Party Finger Foods', 'Tea Time Snacks'],
    ingredients: [
      '500g potatoes, diced',
      '1 onion, finely chopped',
      '2 tbsp curry powder',
      '2 green chilies, minced',
      '2 tbsp oil',
      'Salt and pepper to taste',
      'Lime juice',
      'Curry leaves'
    ],
    steps: [
      'Boil potatoes until soft, then drain.',
      'Heat oil in a pan and sauté onions until golden.',
      'Add curry powder and cook for 1 minute.',
      'Add boiled potatoes and stir-fry for 5 minutes.',
      'Season with salt, pepper, and lime juice.',
      'Garnish with curry leaves and serve hot.'
    ],
    servings: 4
  },

  // Rice & Curry - Red Curry
  {
    id: '3',
    title: 'Chicken Red Curry',
    category: 'Rice & Curry',
    subcategory: 'Red Curry',
    prepTime: '30 mins',
    cookingTime: '40 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1455521458687-08d10277a20c?w=500&h=400&fit=crop',
    description: 'Rich and aromatic chicken curry with red onions and coconut milk.',
    occasions: ['Family Gatherings', 'Festive Feasts'],
    ingredients: [
      '600g chicken breast, cubed',
      '3 tbsp red curry powder',
      '1 cup coconut milk',
      '2 red onions, sliced',
      '4 green chilies, sliced',
      '1 inch ginger, crushed',
      'Curry leaves',
      'Salt and sugar to taste',
      'Tamarind paste'
    ],
    steps: [
      'Heat oil in a pot and sauté onions until soft.',
      'Add curry powder and cook for 1 minute.',
      'Add chicken pieces and brown on all sides.',
      'Pour in coconut milk and bring to simmer.',
      'Add chilies, ginger, and tamarind paste.',
      'Simmer for 20 minutes until chicken is tender.',
      'Season with salt and sugar, garnish with curry leaves.'
    ],
    servings: 4
  },

  // Rice & Curry - Dhal Curry
  {
    id: '4',
    title: 'Creamy Dhal Curry',
    category: 'Rice & Curry',
    subcategory: 'Dhal Curry',
    prepTime: '15 mins',
    cookingTime: '25 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1626189162169-927589f35255?w=500&h=400&fit=crop',
    description: 'Smooth lentil curry infused with coconut milk and tempered spices.',
    occasions: ['Quick Weeknight Dinners', 'Family Gatherings'],
    ingredients: [
      '1 cup red lentils, rinsed',
      '1 small onion, chopped',
      '2.5 cups water',
      '1/2 cup coconut milk',
      '1 tsp turmeric powder',
      '1 tsp curry powder',
      '2 garlic cloves, minced',
      'Curry leaves',
      'Mustard seeds',
      'Salt to taste'
    ],
    steps: [
      'Boil lentils with turmeric, onion, and garlic until soft.',
      'Mash slightly and add coconut milk and curry powder.',
      'Simmer for 5 minutes, season with salt.',
      'Temper mustard seeds and curry leaves in hot oil.',
      'Pour tempering over dhal and mix well.',
      'Serve hot with rice.'
    ],
    servings: 4
  },

  // Kottu & Street Food
  {
    id: '5',
    title: 'Chicken Kottu Roti',
    category: 'Kottu & Street Food',
    subcategory: 'Kottu Roti',
    prepTime: '25 mins',
    cookingTime: '15 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop',
    description: 'Chopped godamba roti tossed with spiced chicken, vegetables, and gravy.',
    occasions: ['Picnic Food Ideas', 'Quick Weeknight Dinners'],
    ingredients: [
      '6 godamba roti, cut into thin strips',
      '250g cooked chicken, shredded',
      '2 eggs, lightly beaten',
      '1 cup mixed vegetables',
      '1 onion, sliced',
      '2 green chilies, sliced',
      '2 tbsp kottu curry sauce',
      '1 tsp curry powder',
      'Salt and black pepper'
    ],
    steps: [
      'Heat oil in a large skillet and stir-fry onions and chilies.',
      'Add chicken and curry powder, mix well.',
      'Add roti strips and vegetables, toss continuously.',
      'Push to the side, scramble eggs, and fold through.',
      'Pour in curry sauce and season.',
      'Serve hot with lime wedges.'
    ],
    servings: 2
  },

  // Traditional Sri Lankan
  {
    id: '6',
    title: 'Pol Sambol & Hoppers',
    category: 'Traditional Sri Lankan',
    subcategory: 'Breakfast Classics',
    prepTime: '45 mins',
    cookingTime: '30 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1568522613219-6db1dfb35c1c?w=500&h=400&fit=crop',
    description: 'Crisp-edged hoppers filled with fresh coconut sambol and lime.',
    occasions: ['Family Gatherings', 'Tea Time Snacks'],
    ingredients: [
      '2 cups rice flour',
      '1 cup thick coconut milk',
      '1 tsp instant yeast',
      '1 tsp sugar',
      '1 tsp salt',
      '2 cups warm water',
      '1 cup grated coconut',
      '1 red onion, finely chopped',
      '2 red chilies, sliced',
      'Lime juice'
    ],
    steps: [
      'Mix flour, yeast, sugar, salt, water, and coconut milk into batter.',
      'Rest for 1 hour before using.',
      'Heat hopper pan, pour batter, and create crispy sides.',
      'Cook with lid on until edges are golden.',
      'Mix coconut, onion, chilies, and lime for sambol.',
      'Serve warm hoppers with sambol in the center.'
    ],
    servings: 4
  },

  // Traditional Sri Lankan - Rice & Curry
  {
    id: '7',
    title: 'Kiribath with Lunu Miris',
    category: 'Traditional Sri Lankan',
    subcategory: 'Rice & Curry',
    prepTime: '20 mins',
    cookingTime: '30 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1504674900968-8873faf098b5?w=500&h=400&fit=crop',
    description: 'Creamy coconut milk rice served with spicy onion relish.',
    occasions: ['Festive Feasts', 'Family Gatherings'],
    ingredients: [
      '2 cups white rice, rinsed',
      '2 cups coconut milk',
      '2 cups water',
      '1 tsp salt',
      '1 cup red onion, chopped',
      '2 dried red chilies, crushed',
      '1 tsp Maldive fish',
      'Lime juice'
    ],
    steps: [
      'Cook rice with water and salt until tender.',
      'Stir in coconut milk and cook on low until creamy.',
      'Press into a tray and cut into diamond shapes.',
      'Mix onion, chilies, Maldive fish, and lime.',
      'Serve warm kiribath with lunu miris.'
    ],
    servings: 4
  },

  // Fast Food - Burgers & Sandwiches
  {
    id: '8',
    title: 'Spicy Chicken Burger',
    category: 'Fast Food',
    subcategory: 'Burgers & Sandwiches',
    prepTime: '15 mins',
    cookingTime: '20 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop',
    description: 'Crispy chicken burger with spicy mayo and fresh lettuce.',
    occasions: ['Picnic Food Ideas', 'Quick Weeknight Dinners'],
    ingredients: [
      '2 chicken breasts',
      '2 burger buns',
      '3 tbsp spicy mayo',
      'Fresh lettuce leaves',
      '2 tomato slices',
      '2 onion rings',
      '1 tbsp curry powder',
      'Salt and pepper',
      'Oil for frying'
    ],
    steps: [
      'Marinate chicken with curry powder, salt, and pepper.',
      'Fry or grill chicken until cooked through.',
      'Toast the buns lightly.',
      'Spread spicy mayo on both buns.',
      'Layer lettuce, tomato, chicken, and onion rings.',
      'Serve immediately with fries.'
    ],
    servings: 2
  },

  // Healthy Recipes
  {
    id: '9',
    title: 'Quinoa Buddha Bowl',
    category: 'Healthy Recipes',
    subcategory: 'Bowls & Salads',
    prepTime: '20 mins',
    cookingTime: '15 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop',
    description: 'Nutritious bowl with quinoa, roasted vegetables, and tahini dressing.',
    occasions: ['Tea Time Snacks', 'Quick Weeknight Dinners'],
    ingredients: [
      '1 cup cooked quinoa',
      '1 cup roasted chickpeas',
      '2 cups mixed greens',
      '1 cup roasted vegetables',
      '1/4 cup tahini',
      '2 tbsp lime juice',
      '1 garlic clove, minced',
      'Salt and pepper',
      'Fresh herbs'
    ],
    steps: [
      'Cook quinoa according to package instructions.',
      'Arrange greens in a bowl.',
      'Add roasted vegetables and chickpeas.',
      'Top with cooked quinoa.',
      'Whisk tahini with lime juice and garlic.',
      'Drizzle dressing and garnish with herbs.'
    ],
    servings: 2
  },

  // Vegetarian
  {
    id: '10',
    title: 'Polos Curry (Green Jackfruit)',
    category: 'Vegetarian',
    subcategory: 'Curries',
    prepTime: '20 mins',
    cookingTime: '40 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop',
    description: 'Rich and hearty young jackfruit curry with aromatic spices.',
    occasions: ['Family Gatherings', 'Festive Feasts'],
    ingredients: [
      '500g green jackfruit, chopped',
      '1 onion, sliced',
      '2 cups coconut milk',
      '2 tbsp curry powder',
      '1 tsp chili powder',
      '1 tsp turmeric',
      'Curry leaves',
      'Cinnamon stick',
      'Salt to taste'
    ],
    steps: [
      'Boil jackfruit pieces until tender.',
      'Sauté onions and curry leaves.',
      'Add curry powder and cook for 1 minute.',
      'Add jackfruit and coconut milk.',
      'Simmer for 20 minutes until thick.',
      'Season with salt and serve with rice.'
    ],
    servings: 4
  },

  // Seafood
  {
    id: '11',
    title: 'Prawn Curry',
    category: 'Seafood',
    subcategory: 'Fish & Shrimp',
    prepTime: '20 mins',
    cookingTime: '25 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1505521195447-ee4f6e0d0fa5?w=500&h=400&fit=crop',
    description: 'Succulent prawns cooked in aromatic coconut gravy.',
    occasions: ['Festive Feasts', 'Family Gatherings'],
    ingredients: [
      '500g large prawns',
      '1 onion, sliced',
      '1.5 cups coconut milk',
      '2 tbsp curry powder',
      '1 tbsp chili paste',
      '3 green chilies, slit',
      'Curry leaves',
      '1 tbsp tamarind paste',
      'Salt to taste'
    ],
    steps: [
      'Heat oil and sauté onions and green chilies.',
      'Add curry powder and chili paste.',
      'Add prawns and cook for 2 minutes.',
      'Pour coconut milk and tamarind paste.',
      'Simmer for 15 minutes.',
      'Season and garnish with curry leaves.'
    ],
    servings: 3
  },

  // Desserts
  {
    id: '12',
    title: 'Watalappan (Jaggery Custard)',
    category: 'Desserts',
    subcategory: 'Traditional Sweets',
    prepTime: '15 mins',
    cookingTime: '30 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop',
    description: 'Creamy jaggery custard infused with cardamom and topped with cashews.',
    occasions: ['Tea Time Snacks', 'Festive Feasts'],
    ingredients: [
      '250g jaggery, grated',
      '4 eggs',
      '1 cup coconut milk',
      '1 tsp vanilla extract',
      '1/2 tsp cardamom powder',
      '2 tbsp roasted cashews',
      'Pinch of salt'
    ],
    steps: [
      'Melt jaggery in a pan with a splash of water.',
      'Beat eggs gently and mix with coconut milk.',
      'Combine melted jaggery with egg mixture.',
      'Add vanilla, cardamom, and salt.',
      'Pour into ramekins and bake in water bath for 30 minutes.',
      'Chill and garnish with cashews.'
    ],
    servings: 4
  },

  // Juices & Smoothies
  {
    id: '13',
    title: 'King Coconut Cooler',
    category: 'Juices & Smoothies',
    subcategory: 'Fresh Drinks',
    prepTime: '5 mins',
    cookingTime: '0 mins',
    difficulty: 'Very Easy',
    image: 'https://images.unsplash.com/photo-1590564533366-bd89b27df645?w=500&h=400&fit=crop',
    description: 'Refreshing king coconut water with lime and mint.',
    occasions: ['Picnic Food Ideas', 'Tea Time Snacks'],
    ingredients: [
      '2 cups king coconut water',
      'Juice of 1 lime',
      '1 tbsp honey',
      'Fresh mint leaves',
      'Ice cubes',
      'Pinch of salt'
    ],
    steps: [
      'Pour king coconut water into a blender.',
      'Add lime juice and honey.',
      'Add fresh mint leaves and a pinch of salt.',
      'Blend with ice until smooth.',
      'Serve immediately in chilled glasses.'
    ],
    servings: 2
  },

  // Beverages
  {
    id: '14',
    title: 'Spiced Tea (Chai)',
    category: 'Beverages',
    subcategory: 'Hot Drinks',
    prepTime: '5 mins',
    cookingTime: '10 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1597318098241-ffd4407b799e?w=500&h=400&fit=crop',
    description: 'Aromatic spiced tea with cardamom, cinnamon, and cloves.',
    occasions: ['Tea Time Snacks', 'Family Gatherings'],
    ingredients: [
      '2 cups water',
      '1 cup milk',
      '2 tbsp loose black tea leaves',
      '2 green cardamom pods',
      '1 cinnamon stick, broken',
      '3-4 cloves',
      'Sugar to taste',
      'Ginger slices'
    ],
    steps: [
      'Bring water and ginger slices to a boil.',
      'Add cardamom, cinnamon, and cloves.',
      'Simmer for 3 minutes.',
      'Add tea leaves and steep for 2 minutes.',
      'Pour in milk and bring to a boil.',
      'Strain and serve with sugar.'
    ],
    servings: 2
  },

  // International Cuisine - Asian
  {
    id: '15',
    title: 'Thai Green Curry',
    category: 'International Cuisine',
    subcategory: 'Asian',
    prepTime: '20 mins',
    cookingTime: '20 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1455521458687-08d10277a20c?w=500&h=400&fit=crop',
    description: 'Creamy Thai curry with green peppers and basil.',
    occasions: ['Quick Weeknight Dinners', 'Family Gatherings'],
    ingredients: [
      '400g chicken breast, sliced',
      '3 tbsp Thai green curry paste',
      '1 cup coconut milk',
      '1 cup chicken broth',
      '2 green bell peppers, sliced',
      '100g Thai basil leaves',
      '2 bird eye chilies',
      'Fish sauce to taste',
      'Lime juice'
    ],
    steps: [
      'Heat oil in a wok and add curry paste.',
      'Cook paste for 1 minute until fragrant.',
      'Add coconut milk and chicken broth.',
      'Add chicken pieces and simmer for 10 minutes.',
      'Add peppers and cook for 5 minutes.',
      'Stir in basil, fish sauce, and lime juice.',
      'Serve with jasmine rice.'
    ],
    servings: 3
  },

  // New Modern Recipes - Acai Bowl
  {
    id: '16',
    title: 'Tropical Açaí Bowl',
    category: 'Healthy Recipes',
    subcategory: 'Bowls & Salads',
    prepTime: '10 mins',
    cookingTime: '0 mins',
    difficulty: 'Very Easy',
    image: 'https://images.unsplash.com/photo-1590721294121-e81342b26fbb?w=500&h=400&fit=crop',
    description: 'Creamy açaí berry smoothie bowl topped with fresh fruits and granola.',
    occasions: ['Breakfast', 'Tea Time Snacks'],
    ingredients: [
      '150g açaí pulp',
      '1 banana',
      '1 cup mixed berries',
      '1/2 cup Greek yogurt',
      '1/4 cup granola',
      '2 tbsp honey',
      'Shredded coconut',
      'Fresh mint',
      'Edible flowers for garnish'
    ],
    steps: [
      'Blend açaí pulp with banana and half the berries.',
      'Add yogurt and blend until creamy.',
      'Pour into a bowl and create a smooth surface.',
      'Arrange fresh fruits, granola, and coconut on top.',
      'Drizzle with honey and garnish with mint.',
      'Serve immediately with a spoon.'
    ],
    servings: 1
  },

  // Modern Dessert - Chocolate Fudge Brownies
  {
    id: '17',
    title: 'Decadent Chocolate Brownies',
    category: 'Desserts',
    subcategory: 'Modern Sweets',
    prepTime: '15 mins',
    cookingTime: '25 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1607920591413-264ec2aa8e3e?w=500&h=400&fit=crop',
    description: 'Rich, fudgy chocolate brownies with a gooey center.',
    occasions: ['Birthday Party Finger Foods', 'Tea Time Snacks'],
    ingredients: [
      '200g dark chocolate, chopped',
      '150g butter',
      '150g sugar',
      '2 eggs',
      '100g flour',
      '2 tbsp cocoa powder',
      '1/2 tsp vanilla extract',
      '1 tsp baking powder',
      'Pinch of salt'
    ],
    steps: [
      'Preheat oven to 180°C and grease a pan.',
      'Melt chocolate and butter together.',
      'Beat eggs and sugar until fluffy.',
      'Combine chocolate mixture with egg mixture.',
      'Fold in flour, cocoa powder, and baking powder.',
      'Pour into pan and bake for 25 minutes.',
      'Cool slightly and cut into squares.'
    ],
    servings: 12
  },

  // Modern Sweet - Salted Caramel Cheesecake
  {
    id: '18',
    title: 'Salted Caramel Cheesecake',
    category: 'Desserts',
    subcategory: 'Modern Sweets',
    prepTime: '30 mins',
    cookingTime: '45 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1614707267537-b85faf00021b?w=500&h=400&fit=crop',
    description: 'Creamy cheesecake with sweet-salty caramel topping.',
    occasions: ['Festive Feasts', 'Birthday Party Finger Foods'],
    ingredients: [
      '200g digestive biscuits, crushed',
      '100g butter, melted',
      '500g cream cheese',
      '100g sugar',
      '50ml sour cream',
      '2 eggs',
      '1 tsp vanilla extract',
      '200ml caramel sauce',
      'Sea salt flakes'
    ],
    steps: [
      'Line a springform pan with parchment paper.',
      'Mix crushed biscuits with melted butter and press into pan.',
      'Blend cream cheese, sugar, sour cream, eggs, and vanilla.',
      'Pour mixture over base.',
      'Bake at 160°C for 45 minutes until set but slightly jiggly.',
      'Cool completely and refrigerate for 4 hours.',
      'Top with caramel sauce and sprinkle with sea salt.'
    ],
    servings: 8
  },

  // Modern Fusion - Lemongrass Panna Cotta
  {
    id: '19',
    title: 'Lemongrass Panna Cotta',
    category: 'Desserts',
    subcategory: 'Modern Sweets',
    prepTime: '20 mins',
    cookingTime: '10 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1488366869515-9edc1a470ca9?w=500&h=400&fit=crop',
    description: 'Silky panna cotta infused with fragrant lemongrass.',
    occasions: ['Festive Feasts', 'Tea Time Snacks'],
    ingredients: [
      '2 stalks lemongrass, crushed',
      '500ml heavy cream',
      '100ml whole milk',
      '50g sugar',
      '4 leaves gelatin (or 2 tsp powder)',
      '2 tbsp passion fruit pulp',
      '1 tsp vanilla extract',
      'Mint leaves for garnish'
    ],
    steps: [
      'Heat cream and milk with lemongrass and sugar.',
      'Simmer for 5 minutes and remove from heat.',
      'Soak gelatin in cold water and add to hot mixture.',
      'Strain through fine sieve into ramekins.',
      'Chill for 4-6 hours until set.',
      'Top with passion fruit pulp and mint leaves.',
      'Serve chilled.'
    ],
    servings: 4
  },

  // Modern Sweet - Matcha Cheesecake Bites
  {
    id: '20',
    title: 'Matcha Cheesecake Bites',
    category: 'Desserts',
    subcategory: 'Modern Sweets',
    prepTime: '25 mins',
    cookingTime: '20 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop',
    description: 'Delicate matcha-infused cheesecake bites with white chocolate ganache.',
    occasions: ['Tea Time Snacks', 'Birthday Party Finger Foods'],
    ingredients: [
      '150g digestive biscuits',
      '100g butter, melted',
      '400g cream cheese',
      '80g sugar',
      '3 tbsp matcha powder',
      '100ml heavy cream',
      '100g white chocolate',
      '1 tsp vanilla extract'
    ],
    steps: [
      'Mix crushed biscuits with melted butter and press into muffin tin lined with cupcake cases.',
      'Beat cream cheese, sugar, matcha, and vanilla until smooth.',
      'Divide mixture into muffin cases.',
      'Bake at 160°C for 20 minutes until set.',
      'Cool and refrigerate for 2 hours.',
      'Melt white chocolate and pour over each bite.',
      'Tops with edible gold leaf if desired.'
    ],
    servings: 12
  },

  // Modern Sweet - Pistachio Macarons
  {
    id: '21',
    title: 'French Pistachio Macarons',
    category: 'Desserts',
    subcategory: 'Modern Sweets',
    prepTime: '40 mins',
    cookingTime: '15 mins',
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1569718212174-6e70eca0e55a?w=500&h=400&fit=crop',
    description: 'Delicate French macarons with pistachio filling.',
    occasions: ['Festive Feasts', 'Birthday Party Finger Foods'],
    ingredients: [
      '100g ground almonds',
      '100g icing sugar',
      '30g pistachio powder',
      '3 egg whites',
      '30g caster sugar',
      '200g butter',
      '50g powdered sugar',
      '2 tbsp pistachio paste'
    ],
    steps: [
      'Sift almonds, icing sugar, and pistachio powder together.',
      'Whip egg whites until stiff peaks, add caster sugar gradually.',
      'Fold dry ingredients into meringue until shiny.',
      'Pipe onto parchment and dry for 30 minutes.',
      'Bake at 150°C for 15 minutes.',
      'Beat butter and powdered sugar, add pistachio paste.',
      'Sandwich cooled macarons with pistachio cream.'
    ],
    servings: 24
  },

  // Modern Sweet - Chocolate Lava Cake
  {
    id: '22',
    title: 'Molten Chocolate Lava Cake',
    category: 'Desserts',
    subcategory: 'Modern Sweets',
    prepTime: '15 mins',
    cookingTime: '12 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop',
    description: 'Individual chocolate cakes with a lusciously melted center.',
    occasions: ['Festive Feasts', 'Birthday Party Finger Foods'],
    ingredients: [
      '150g dark chocolate',
      '100g butter',
      '2 eggs',
      '50g sugar',
      '2 tbsp flour',
      '1/2 tsp vanilla extract',
      'Butter and cocoa for ramekins',
      'Powdered sugar for dusting'
    ],
    steps: [
      'Preheat oven to 200°C.',
      'Melt chocolate and butter together.',
      'Whisk eggs and sugar until pale.',
      'Fold chocolate mixture into eggs.',
      'Gently fold in flour and vanilla.',
      'Divide between buttered ramekins.',
      'Bake for 12 minutes until set but center is soft.',
      'Invert onto plates and dust with powdered sugar.'
    ],
    servings: 4
  },

  // Modern Sweet - Mango Cheesecake
  {
    id: '23',
    title: 'Creamy Mango Cheesecake',
    category: 'Desserts',
    subcategory: 'Modern Sweets',
    prepTime: '30 mins',
    cookingTime: '40 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop',
    description: 'Tropical mango layered with silky cheesecake.',
    occasions: ['Festive Feasts', 'Birthday Party Finger Foods'],
    ingredients: [
      '200g digestive biscuits, crushed',
      '100g butter, melted',
      '600g cream cheese',
      '150g sugar',
      '3 eggs',
      '200ml heavy cream',
      '300g fresh mango puree',
      '50ml lime juice',
      '2 tsp vanilla extract'
    ],
    steps: [
      'Mix crushed biscuits with butter and press into springform pan.',
      'Beat cream cheese and sugar until fluffy.',
      'Add eggs one at a time, mix well.',
      'Add cream, mango puree, lime juice, and vanilla.',
      'Pour over base and bake at 150°C for 40 minutes.',
      'Cool completely and refrigerate for 6 hours.',
      'Serve chilled with fresh mango slices.'
    ],
    servings: 10
  },

  // Modern Sweet - Strawberry Shortcake
  {
    id: '24',
    title: 'Classic Strawberry Shortcake',
    category: 'Desserts',
    subcategory: 'Modern Sweets',
    prepTime: '20 mins',
    cookingTime: '30 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop',
    description: 'Light sponge cake with fresh strawberries and whipped cream.',
    occasions: ['Tea Time Snacks', 'Birthday Party Finger Foods'],
    ingredients: [
      '200g flour',
      '150g sugar',
      '3 eggs',
      '150ml milk',
      '2 tsp baking powder',
      '1 tsp vanilla extract',
      '500g fresh strawberries',
      '400ml heavy cream',
      '50g icing sugar'
    ],
    steps: [
      'Preheat oven to 180°C.',
      'Cream butter and sugar, add eggs one by one.',
      'Alternate adding flour mixture and milk.',
      'Divide between two cake tins and bake for 30 minutes.',
      'Cool and slice strawberries.',
      'Whip cream with icing sugar.',
      'Layer cake with strawberries and cream.'
    ],
    servings: 8
  },

  // Modern Fusion - Spiced Mango Lassi
  {
    id: '25',
    title: 'Spiced Mango Lassi',
    category: 'Juices & Smoothies',
    subcategory: 'Fresh Drinks',
    prepTime: '10 mins',
    cookingTime: '0 mins',
    difficulty: 'Very Easy',
    image: 'https://images.unsplash.com/photo-1590080876989-e1f3c20ee5d4?w=500&h=400&fit=crop',
    description: 'Creamy yogurt drink with fresh mango and cardamom spice.',
    occasions: ['Tea Time Snacks', 'Family Gatherings'],
    ingredients: [
      '300g fresh mango pulp',
      '200g plain yogurt',
      '100ml milk',
      '2 tbsp honey',
      '1/4 tsp cardamom powder',
      'Pinch of salt',
      'Ice cubes',
      'Fresh mint for garnish'
    ],
    steps: [
      'Blend mango pulp with yogurt and milk.',
      'Add honey, cardamom, and salt.',
      'Blend until smooth and creamy.',
      'Add ice cubes and blend briefly.',
      'Pour into glasses and garnish with mint.',
      'Serve immediately while chilled.'
    ],
    servings: 2
  },

  // Modern Non-Traditional - Avocado Toast with Egg
  {
    id: '26',
    title: 'Avocado Toast with Poached Egg',
    category: 'Healthy Recipes',
    subcategory: 'Bowls & Salads',
    prepTime: '10 mins',
    cookingTime: '10 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1587521177754-94b93f4b51d3?w=500&h=400&fit=crop',
    description: 'Trendy breakfast with creamy avocado, crusty toast, and perfectly poached egg.',
    occasions: ['Breakfast', 'Picnic Food Ideas'],
    ingredients: [
      '2 slices sourdough bread',
      '1 ripe avocado',
      '2 eggs',
      '1/2 lemon',
      'Red pepper flakes',
      'Maldon salt',
      'Fresh micro greens',
      '1 tbsp olive oil'
    ],
    steps: [
      'Toast bread until golden and crispy.',
      'Poach eggs in simmering water with vinegar.',
      'Mash avocado with lemon juice and salt.',
      'Spread avocado generously on toast.',
      'Top with poached egg and red pepper flakes.',
      'Garnish with micro greens and drizzle oil.',
      'Serve immediately.'
    ],
    servings: 2
  },

  // Quick Weeknight Dinners
  {
    id: '27',
    title: 'Chicken Stir-Fry',
    category: 'Quick Weeknight Dinners',
    subcategory: 'Stir-fried dishes',
    prepTime: '15 mins',
    cookingTime: '15 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=500&h=400&fit=crop',
    description: 'Quick and delicious stir-fried chicken with colorful vegetables and aromatic garlic in a savory soy sauce. Perfect for busy weeknights!',
    occasions: ['Quick Weeknight Dinners', 'Family Gatherings'],
    ingredients: [
      '400g chicken breast, cubed',
      '2 cups mixed vegetables (bell peppers, broccoli, snap peas)',
      '4 garlic cloves, minced',
      '3 tbsp soy sauce',
      '1 tbsp sesame oil',
      '2 tbsp vegetable oil',
      '1 tsp ginger, grated',
      '2 green chilies, sliced',
      'Salt and pepper to taste'
    ],
    steps: [
      'Heat oil in a wok over high heat.',
      'Stir-fry chicken until 70% cooked.',
      'Add garlic, ginger, and green chilies.',
      'Add all vegetables and stir-fry for 3 minutes.',
      'Pour soy sauce and sesame oil.',
      'Toss everything together for 2 minutes.',
      'Season with salt and pepper.',
      'Serve hot with rice or noodles.'
    ],
    servings: 3
  },

  {
    id: '28',
    title: 'Egg Fried Rice',
    category: 'Quick Weeknight Dinners',
    subcategory: 'Rice dishes',
    prepTime: '10 mins',
    cookingTime: '10 mins',
    difficulty: 'Very Easy',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a104?w=500&h=400&fit=crop',
    description: 'Golden, fluffy fried rice loaded with eggs and aromatic seasonings. A complete meal ready in just 20 minutes!',
    occasions: ['Quick Weeknight Dinners', 'Breakfast'],
    ingredients: [
      '2 cups cooked rice (day-old, cooled)',
      '3 eggs, beaten',
      '1 large onion, diced',
      '1/2 cup mixed vegetables (peas, carrots, corn)',
      '3 tbsp soy sauce',
      '2 tbsp vegetable oil',
      '3 garlic cloves, minced',
      '2 green onions, chopped',
      'White pepper to taste',
      'Sesame oil for garnish'
    ],
    steps: [
      'Heat oil in a wok or large pan.',
      'Scramble eggs and remove from wok.',
      'Add more oil and stir-fry onions and garlic.',
      'Add mixed vegetables and stir-fry for 2 minutes.',
      'Add rice and break any lumps.',
      'Pour soy sauce and mix well.',
      'Add cooked eggs back in.',
      'Top with green onions and sesame oil.',
      'Serve immediately while hot.'
    ],
    servings: 2
  },

  // Picnic Food Ideas
  {
    id: '29',
    title: 'Chicken Sandwich',
    category: 'Picnic Food Ideas',
    subcategory: 'Sandwiches',
    prepTime: '10 mins',
    cookingTime: '5 mins',
    difficulty: 'Very Easy',
    image: 'https://images.unsplash.com/photo-1585238341710-4913f3f0c64a?w=500&h=400&fit=crop',
    description: 'Classic and delicious chicken sandwich with creamy mayo, crispy lettuce, and juicy chicken. Perfect for picnics and lunch boxes!',
    occasions: ['Picnic Food Ideas', 'Quick Weeknight Dinners'],
    ingredients: [
      '200g cooked chicken breast, sliced',
      '4 slices bread',
      '3 tbsp mayonnaise',
      '2 cups fresh lettuce',
      '1 tomato, sliced',
      '1/2 onion, sliced',
      'Salt and pepper to taste',
      'Butter for bread'
    ],
    steps: [
      'Toast bread lightly and butter both sides.',
      'Spread mayonnaise on one slice.',
      'Layer lettuce on the mayo.',
      'Add chicken slices on top.',
      'Add tomato and onion slices.',
      'Season with salt and pepper.',
      'Top with second bread slice.',
      'Cut diagonally and wrap for picnic.'
    ],
    servings: 2
  },

  {
    id: '30',
    title: 'Fruit Salad',
    category: 'Picnic Food Ideas',
    subcategory: 'Salads',
    prepTime: '15 mins',
    cookingTime: '0 mins',
    difficulty: 'Very Easy',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop',
    description: 'Refreshing and colorful fruit salad with fresh apples, bananas, grapes, and oranges. A healthy, hydrating treat perfect for outdoor gatherings!',
    occasions: ['Picnic Food Ideas', 'Tea Time Snacks'],
    ingredients: [
      '2 apples, diced',
      '2 bananas, sliced',
      '1 cup red grapes, halved',
      '2 oranges, segmented',
      '1/2 cup pineapple chunks',
      '3 tbsp honey',
      '2 tbsp lime juice',
      '1 tbsp mint leaves, chopped',
      'Pinch of salt'
    ],
    steps: [
      'Wash and prepare all fruits.',
      'Cut and dice fruits into bite-sized pieces.',
      'In a large bowl, combine all fruits.',
      'Drizzle with honey and lime juice.',
      'Scatter mint leaves on top.',
      'Add a pinch of salt for flavor.',
      'Gently toss all ingredients.',
      'Chill until serving time.',
      'Stir before serving.'
    ],
    servings: 4
  },

  // Birthday Party Finger Foods
  {
    id: '31',
    title: 'Mini Pizza',
    category: 'Birthday Party Finger Foods',
    subcategory: 'Mini pizza',
    prepTime: '15 mins',
    cookingTime: '10 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1599599810525-d4e4f585d4c8?w=500&h=400&fit=crop',
    description: 'Adorable mini pizzas with crispy bread base, tangy sauce, and melted cheese with your favorite toppings. Perfect bite-sized treats for parties!',
    occasions: ['Birthday Party Finger Foods', 'Tea Time Snacks'],
    ingredients: [
      '8 bread slices or mini burger buns',
      '1 cup pizza sauce',
      '2 cups mozzarella cheese, shredded',
      '100g chicken, diced',
      '1/2 onion, diced',
      '1/2 bell pepper, diced',
      '50g pineapple chunks',
      '4 olives, sliced',
      '2 tbsp olive oil',
      'Salt and oregano to taste'
    ],
    steps: [
      'Preheat oven to 200°C.',
      'Place bread slices on a baking sheet.',
      'Spread pizza sauce on each bread slice.',
      'Add diced chicken and sautéed vegetables.',
      'Sprinkle cheese generously on top.',
      'Add pineapple chunks and olives.',
      'Drizzle with olive oil.',
      'Bake for 10 minutes until cheese melts.',
      'Garnish with oregano and serve hot.'
    ],
    servings: 4
  },

  {
    id: '32',
    title: 'Sausage Rolls',
    category: 'Birthday Party Finger Foods',
    subcategory: 'Pastry',
    prepTime: '15 mins',
    cookingTime: '20 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=400&fit=crop',
    description: 'Crispy golden pastry rolls filled with juicy sausages, herbs, and spices. A crowd-pleasing favorite at every party!',
    occasions: ['Birthday Party Finger Foods', 'Tea Time Snacks'],
    ingredients: [
      '8 sausages',
      '1 sheet puff pastry',
      '2 tbsp mustard',
      '1/2 cup breadcrumbs',
      '1 egg, beaten',
      '2 tbsp fresh herbs (parsley, thyme)',
      '1 tsp garlic powder',
      'Salt and pepper to taste',
      'Oil for brush'
    ],
    steps: [
      'Preheat oven to 200°C.',
      'Roll out puff pastry sheet.',
      'Spread thin layer of mustard on pastry.',
      'Cut pastry into strips.',
      'Wrap each strip around a sausage.',
      'Mix breadcrumbs with herbs and spices.',
      'Brush sausage rolls with beaten egg.',
      'Roll in breadcrumb mixture.',
      'Bake for 20 minutes until golden brown.',
      'Serve warm with dipping sauce.'
    ],
    servings: 4
  },

  // Tea Time Snacks
  {
    id: '33',
    title: 'Vegetable Samosa',
    category: 'Tea Time Snacks',
    subcategory: 'South Asian snacks',
    prepTime: '20 mins',
    cookingTime: '15 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1601050915589-ab8a210c53a0?w=500&h=400&fit=crop',
    description: 'Crispy, golden triangular pastries filled with spiced potatoes and peas. Traditional tea-time favorite with perfect texture and flavor!',
    occasions: ['Tea Time Snacks', 'Family Gatherings'],
    ingredients: [
      '2 cups all-purpose flour',
      '1/2 cup ghee',
      '200g potatoes, boiled and diced',
      '1/2 cup green peas',
      '1 onion, finely chopped',
      '2 green chilies, minced',
      '1 tbsp ginger-garlic paste',
      '1 tsp cumin powder',
      '1 tsp coriander powder',
      '1/2 tsp garam masala',
      'Salt to taste',
      'Oil for frying',
      'Water for dough'
    ],
    steps: [
      'Prepare dough with flour, ghee, salt, and water.',
      'Let dough rest for 30 minutes.',
      'Brown onions in a pan.',
      'Add ginger-garlic paste and green chilies.',
      'Add potatoes and peas with spices.',
      'Mix filling until well combined.',
      'Roll dough thin and cut into strips.',
      'Fold into triangular shape and seal edges.',
      'Deep fry until golden brown and crispy.',
      'Serve hot with tamarind chutney.'
    ],
    servings: 6
  },

  {
    id: '34',
    title: 'Simple Muffins',
    category: 'Tea Time Snacks',
    subcategory: 'Baked goods',
    prepTime: '15 mins',
    cookingTime: '20 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=400&fit=crop',
    description: 'Soft, fluffy muffins with delicate crumb texture. Perfect compliment to tea or coffee, and great for snacking any time!',
    occasions: ['Tea Time Snacks', 'Breakfast'],
    ingredients: [
      '2 cups all-purpose flour',
      '1/2 cup sugar',
      '2 tsp baking powder',
      '1/4 tsp salt',
      '2 eggs',
      '1 cup milk',
      '1/4 cup vegetable oil',
      '1 tsp vanilla extract',
      '1/2 cup blueberries or chocolate chips',
      '1 tbsp flour for coating berries'
    ],
    steps: [
      'Preheat oven to 200°C.',
      'Mix flour, sugar, baking powder, and salt.',
      'In another bowl, beat eggs with milk, oil, and vanilla.',
      'Combine wet and dry ingredients gently.',
      'Do not overmix; some lumps are okay.',
      'Fold in berries or chocolate chips.',
      'Pour into greased muffin cups.',
      'Bake for 20 minutes until golden.',
      'Cool for 5 minutes before removing.',
      'Serve warm with butter or jam.'
    ],
    servings: 12
  },

  // Family Gatherings
  {
    id: '35',
    title: 'Chicken Biryani',
    category: 'Family Gatherings',
    subcategory: 'Rice & curry sets',
    prepTime: '30 mins',
    cookingTime: '45 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop',
    description: 'Aromatic, fragrant rice dish layered with tender marinated chicken, saffron, and traditional spices. A true celebration dish!',
    occasions: ['Family Gatherings', 'Festive Feasts'],
    ingredients: [
      '500g chicken, cut into pieces',
      '3 cups basmati rice',
      '1 cup yogurt',
      '4 tbsp ghee',
      '8 cloves',
      '4 cardamom pods',
      '2 bay leaves',
      '1 cinnamon stick',
      '6 onions, sliced',
      '6 garlic cloves, minced',
      '2 tbsp ginger, minced',
      '4 green chilies',
      '1/4 tsp saffron strands',
      '2 tbsp warm milk',
      'Salt and pepper to taste'
    ],
    steps: [
      'Make saffron water by soaking strands in warm milk.',
      'Mix yogurt, ginger-garlic paste with chicken.',
      'Marinate chicken for 30 minutes.',
      'In a pot, fry onions until golden brown.',
      'Add half the fried onions to marinated chicken.',
      'In a heavy-bottomed pot, layer rice and chicken.',
      'Top with remaining onions and saffron water.',
      'Dot with ghee and cover tightly.',
      'Cook on low heat for 45 minutes.',
      'Let rest for 5 minutes before serving.'
    ],
    servings: 5
  },

  {
    id: '36',
    title: 'Roast Chicken',
    category: 'Family Gatherings',
    subcategory: 'Roasted dishes',
    prepTime: '20 mins',
    cookingTime: '60 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1598103442097-8f74e88f2d7d?w=500&h=400&fit=crop',
    description: 'Juicy, herb-marinated whole chicken with crispy golden skin. A showstopping centerpiece for any family dinner!',
    occasions: ['Family Gatherings', 'Festive Feasts'],
    ingredients: [
      '2 whole chickens (1.5 kg each)',
      '1/2 cup yogurt',
      '6 garlic cloves, minced',
      '2 tbsp ginger, minced',
      '4 tbsp olive oil',
      '2 tbsp lemon juice',
      '2 tsp turmeric',
      '1 tbsp paprika',
      '2 tsp cumin powder',
      '2 tsp coriander powder',
      '1 tsp garam masala',
      'Salt and pepper to taste',
      'Fresh herbs for garnish'
    ],
    steps: [
      'Mix yogurt with all spices and oils.',
      'Marinate chickens for at least 4 hours.',
      'Preheat oven to 180°C.',
      'Place marinated chickens on a roasting pan.',
      'Roast for 50-60 minutes, basting occasionally.',
      'Check if juices run clear when pierced.',
      'Let rest for 10 minutes after roasting.',
      'Garnish with fresh herbs.',
      'Serve with roasted vegetables and rice.'
    ],
    servings: 6
  },

  // Festive Feasts
  {
    id: '37',
    title: 'Lamprais',
    category: 'Festive Feasts',
    subcategory: 'Traditional dishes',
    prepTime: '30 mins',
    cookingTime: '50 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop',
    description: 'A festive favorite! Aromatic rice and meat curry wrapped in banana leaves and steamed to perfection. Pure comfort in every bite!',
    occasions: ['Festive Feasts', 'Family Gatherings'],
    ingredients: [
      '2 cups basmati rice',
      '300g meat (beef/chicken), minced',
      '4 boiled eggs, halved',
      '2 large onions, sliced',
      '6 garlic cloves, minced',
      '2 tbsp curry powder',
      '1 tsp cumin powder',
      '1 tsp coriander powder',
      '4 cloves',
      '2 bay leaves',
      '3 tbsp ghee',
      '1 cup meat broth',
      'Banana leaves',
      'Salt and pepper to taste'
    ],
    steps: [
      'Cook rice until 70% done.',
      'In ghee, fry onions until golden.',
      'Add minced meat and cook until done.',
      'Add spices and cook for 2 minutes.',
      'Layer rice, meat curry, and eggs.',
      'Wrap mixture in banana leaves.',
      'Place wrapped portions on a tray.',
      'Pour broth around the wraps.',
      'Steam for 30 minutes covered.',
      'Serve hot with sambols and side dishes.'
    ],
    servings: 4
  },

  {
    id: '38',
    title: 'Seafood Fry',
    category: 'Festive Feasts',
    subcategory: 'Seafood platters',
    prepTime: '15 mins',
    cookingTime: '10 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1586080876203-db9c0b4178eb?w=500&h=400&fit=crop',
    description: 'Crispy, juicy seafood with aromatic spices and fiery chilies. A showstopper dish that brings the ocean to your table!',
    occasions: ['Festive Feasts', 'Family Gatherings'],
    ingredients: [
      '600g prawns or fish fillet',
      '4 red chilies',
      '6 garlic cloves',
      '1 tbsp ginger, minced',
      '1/2 cup lime juice',
      '2 tbsp turmeric powder',
      '2 tsp salt',
      '1 tsp black pepper',
      '3 tbsp vegetable oil',
      '2 tbsp curry leaves',
      '1 large onion, sliced',
      '4 green chilies, slit'
    ],
    steps: [
      'Clean and pat dry prawns or fish.',
      'Pound red chilies and garlic into paste.',
      'Mix paste with lime juice, turmeric, salt, pepper.',
      'Marinate seafood for 15 minutes.',
      'Heat oil in a wok or large pan.',
      'Add curry leaves and green chilies.',
      'Add onions and cook until golden.',
      'Add marinated seafood and cook for 8-10 minutes.',
      'Toss frequently for even cooking.',
      'Serve hot with lime wedges and rice.'
    ],
    servings: 4
  },

  // Breakfast
  {
    id: '39',
    title: 'Pancakes',
    category: 'Breakfast',
    subcategory: 'Morning delights',
    prepTime: '10 mins',
    cookingTime: '15 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=400&fit=crop',
    description: 'Fluffy, golden pancakes stacked high and ready for toppings. Perfect breakfast treat to start your day with joy!',
    occasions: ['Breakfast', 'Tea Time Snacks'],
    ingredients: [
      '2 cups all-purpose flour',
      '2 tbsp sugar',
      '2 tsp baking powder',
      '1/2 tsp salt',
      '1 tbsp vanilla extract',
      '2 eggs',
      '1 1/2 cups milk',
      '2 tbsp melted butter',
      'Oil for pan',
      'Toppings: maple syrup, butter, berries, whipped cream'
    ],
    steps: [
      'Mix flour, sugar, baking powder, and salt.',
      'Whisk eggs with milk and vanilla.',
      'Combine dry and wet ingredients lightly.',
      'Fold in melted butter.',
      'Heat non-stick pan or griddle.',
      'Pour 1/4 cup batter for each pancake.',
      'Cook until edges look dry, then flip.',
      'Cook other side until golden.',
      'Stack warm pancakes on a plate.',
      'Top with butter, syrup, and fresh berries.',
      'Serve immediately while hot.'
    ],
    servings: 4
  },

  {
    id: '40',
    title: 'Banana Smoothie',
    category: 'Beverages',
    subcategory: 'Fresh Drinks',
    prepTime: '5 mins',
    cookingTime: '0 mins',
    difficulty: 'Very Easy',
    image: 'https://images.unsplash.com/photo-1590080872157-8b6db90d7e99?w=500&h=400&fit=crop',
    description: 'Creamy, nutritious banana smoothie blended with milk and honey. A quick, wholesome breakfast or energy-boosting snack!',
    occasions: ['Breakfast', 'Quick Weeknight Dinners'],
    ingredients: [
      '3 ripe bananas, sliced',
      '1 cup whole milk',
      '1/2 cup Greek yogurt',
      '2 tbsp honey',
      '1 tbsp peanut butter (optional)',
      '1/2 tsp vanilla extract',
      '1/4 tsp cinnamon powder',
      '4-5 ice cubes',
      'Toppings: granola, nuts, coconut flakes'
    ],
    steps: [
      'Add bananas to blender.',
      'Pour milk and add yogurt.',
      'Add honey, vanilla, and cinnamon.',
      'Add peanut butter if using.',
      'Place ice cubes on top.',
      'Blend until smooth and creamy.',
      'Pour into glasses.',
      'Top with granola and nuts.',
      'Serve immediately.',
      'Drink while cold for best taste.'
    ],
    servings: 2
  }
];

export default sampleRecipes;
