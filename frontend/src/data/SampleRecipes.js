const sampleRecipes = [
  {
    id: '1',
    title: 'Chicken Kottu Roti',
    category: 'Street Food',
    prepTime: '35 mins',
    difficulty: 'Medium',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg',
    description: 'Chopped godamba roti tossed with spiced chicken, vegetables, and a splash of gravy.',
    ingredients: [
      '6 godamba roti, cut into thin strips',
      '250g cooked chicken, shredded',
      '2 eggs, lightly beaten',
      '1 cup mixed vegetables (carrot, leeks, cabbage)',
      '1 onion, sliced',
      '2 green chilies, sliced',
      '2 tbsp kottu curry sauce or chicken gravy',
      '1 tsp curry powder',
      'Salt and black pepper to taste'
    ],
    steps: [
      'Heat a large skillet on medium heat and add a drizzle of oil.',
      'Stir-fry onion, chilies, and vegetables until fragrant and slightly soft.',
      'Add chicken and curry powder, then mix in the roti strips.',
      'Push everything to the side, scramble the eggs, and fold through.',
      'Pour in gravy, toss well, season, and serve hot with lime.'
    ]
  },
  {
    id: '2',
    title: 'Pol Sambol & Hoppers',
    category: 'Breakfast',
    prepTime: '30 mins',
    difficulty: 'Easy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Lunumiris_with_Appam.JPG',
    description: 'Crisp-edged hoppers filled with coconut sambol and a hint of lime.',
    ingredients: [
      '2 cups rice flour',
      '1 cup thick coconut milk',
      '1 tsp instant yeast',
      '1 tsp sugar',
      '1 tsp salt',
      '2 cups warm water',
      '1 cup freshly grated coconut',
      '1 small red onion, finely chopped',
      '2 red chilies, sliced',
      'Juice of 1 lime',
      'Salt to taste'
    ],
    steps: [
      'Whisk rice flour, yeast, sugar, salt, warm water, and coconut milk into a thin batter. Rest 1 hour.',
      'Heat a hopper pan, pour in a ladle of batter, swirl to create thin sides, and cook with lid on.',
      'For pol sambol, mix grated coconut, onion, chilies, lime, and salt until bright orange.',
      'Serve warm hoppers with a spoon of sambol in the center.'
    ]
  },
  {
    id: '3',
    title: 'Watalappan',
    category: 'Dessert',
    prepTime: '50 mins',
    difficulty: 'Easy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Watalappan_%2823091763250%29.jpg',
    description: 'Creamy jaggery custard infused with cardamom and topped with toasted cashews.',
    ingredients: [
      '250g kithul jaggery, grated',
      '4 eggs',
      '1 cup thick coconut milk',
      '1 tsp vanilla extract',
      '1/2 tsp ground cardamom',
      '2 tbsp roasted cashews, chopped',
      'Pinch of salt'
    ],
    steps: [
      'Melt jaggery with a splash of water over low heat and cool slightly.',
      'Beat eggs gently, then mix in coconut milk, melted jaggery, vanilla, cardamom, and salt.',
      'Pour into ramekins, cover with foil, and steam or bake in a water bath for 30 minutes.',
      'Chill until set and garnish with toasted cashews before serving.'
    ]
  },
  {
    id: '4',
    title: 'Ambul Thiyal (Sour Fish Curry)',
    category: 'Seafood',
    prepTime: '45 mins',
    difficulty: 'Medium',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Srilankan_fish_curry.JPG',
    description: 'Traditional sour fish curry simmered with goraka, black pepper, and roasted spices.',
    ingredients: [
      '600g firm fish (tuna or seer), cut into cubes',
      '1 tbsp roasted curry powder',
      '1 tsp black pepper',
      '1/2 tsp turmeric powder',
      '2 garlic cloves, crushed',
      '1 inch cinnamon stick',
      '5 pieces gamboge (goraka), soaked in warm water',
      'Sprig of curry leaves',
      'Salt to taste'
    ],
    steps: [
      'Mix fish with curry powder, pepper, turmeric, salt, and garlic.',
      'Place fish in a clay pot with cinnamon, curry leaves, and soaked goraka.',
      'Add just enough water to cover, bring to a gentle boil, then simmer on low heat until thick and dark.',
      'Let rest so flavors deepen, then serve with hot rice.'
    ]
  },
  {
    id: '5',
    title: 'King Coconut Cooler',
    category: 'Beverage',
    prepTime: '10 mins',
    difficulty: 'Very Easy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/King_Coconut.jpg',
    description: 'Refreshing thambili juice with lime, mint, and a touch of kithul treacle.',
    ingredients: [
      '2 cups king coconut water (thambili)',
      'Juice of 1 lime',
      '1 tbsp kithul treacle or honey',
      'Handful of fresh mint leaves',
      'Ice cubes'
    ],
    steps: [
      'Combine coconut water, lime juice, and treacle in a jug.',
      'Stir until the sweetener dissolves.',
      'Add crushed mint and ice just before serving for a crisp finish.'
    ]
  },
  {
    id: '6',
    title: 'Kiribath with Lunu Miris',
    category: 'Comfort Food',
    prepTime: '40 mins',
    difficulty: 'Easy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Kiribath_%28milk_rice%29.jpg',
    description: 'Coconut milk rice cut into diamonds and served with fiery onion relish.',
    ingredients: [
      '2 cups white raw rice, rinsed',
      '2 cups thick coconut milk',
      '2 cups water',
      '1 tsp salt',
      '1 cup red onion, finely chopped',
      '2 dried red chilies, crushed',
      '1 tsp Maldive fish flakes (optional)',
      'Juice of 1/2 lime'
    ],
    steps: [
      'Cook rice with water and salt until tender and most liquid is absorbed.',
      'Stir in coconut milk and cook on low until creamy and thick.',
      'Press into a tray, smooth the top, and cut into diamond shapes once slightly cool.',
      'Mix onion, chilies, Maldive fish, and lime to make lunu miris and serve with warm kiribath.'
    ]
  }
];

export default sampleRecipes;
