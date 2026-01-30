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
  },
  {
    id: '7',
    title: 'Parippu (Dhal Curry)',
    category: 'Curry',
    prepTime: '30 mins',
    difficulty: 'Easy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg',
    description: 'Creamy red lentil curry with coconut milk and tempered spices.',
    ingredients: [
      '1 cup red lentils',
      '1 small onion, chopped',
      '2 cups water',
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
      'Mash slightly and add coconut milk, curry powder, and salt.',
      'Temper with mustard seeds and curry leaves in hot oil.',
      'Pour tempering over dhal and serve with rice.'
    ],
    tags: ['Vegetarian', 'Quick', 'Healthy'],
    servings: 4
  },
  {
    id: '8',
    title: 'Egg Hoppers',
    category: 'Breakfast',
    prepTime: '45 mins',
    difficulty: 'Medium',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Lunumiris_with_Appam.JPG',
    description: 'Bowl-shaped hoppers with a perfectly cooked egg in the center.',
    ingredients: [
      '2 cups rice flour',
      '1 cup coconut milk',
      '1 tsp yeast',
      '1 tsp sugar',
      'Salt',
      '6 eggs',
      'Water as needed'
    ],
    steps: [
      'Mix rice flour, yeast, sugar, salt, coconut milk, and water into batter.',
      'Let rest for 1-2 hours.',
      'Heat hopper pan, pour batter and swirl to coat sides.',
      'Crack an egg in the center, cover and cook until egg is set.',
      'Serve hot with sambol.'
    ],
    tags: ['Breakfast', 'Traditional'],
    servings: 6
  },
  {
    id: '9',
    title: 'Polos Curry (Green Jackfruit)',
    category: 'Curry',
    prepTime: '1 hour',
    difficulty: 'Medium',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg',
    description: 'Rich and hearty young jackfruit curry with roasted spices.',
    ingredients: [
      '500g green jackfruit, chopped',
      '1 onion, sliced',
      '2 cups coconut milk',
      '2 tbsp roasted curry powder',
      '1 tsp chili powder',
      '1 tsp turmeric',
      'Curry leaves',
      'Cinnamon stick',
      'Salt to taste'
    ],
    steps: [
      'Boil jackfruit pieces until tender.',
      'Sauté onions, curry leaves, and spices.',
      'Add boiled jackfruit and coconut milk.',
      'Simmer until thick and well combined.',
      'Serve with rice and other curries.'
    ],
    tags: ['Vegetarian', 'Traditional', 'Spicy'],
    servings: 4
  },
  {
    id: '10',
    title: 'Isso Wade (Prawn Fritters)',
    category: 'Snacks',
    prepTime: '40 mins',
    difficulty: 'Medium',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg',
    description: 'Crispy lentil fritters loaded with prawns and spices.',
    ingredients: [
      '1 cup urad dhal, soaked',
      '200g prawns, chopped',
      '2 green chilies',
      '1 onion, finely chopped',
      'Curry leaves',
      '1 tsp cumin',
      'Salt',
      'Oil for frying'
    ],
    steps: [
      'Grind soaked dhal with chilies to a coarse paste.',
      'Mix in prawns, onions, curry leaves, cumin, and salt.',
      'Shape into small patties.',
      'Deep fry until golden and crispy.',
      'Serve hot with chili sauce.'
    ],
    tags: ['Snacks', 'Seafood', 'Crispy'],
    servings: 6
  },
  {
    id: '11',
    title: 'Mutton Curry',
    category: 'Curry',
    prepTime: '1.5 hours',
    difficulty: 'Advanced',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Srilankan_fish_curry.JPG',
    description: 'Slow-cooked mutton in aromatic Sri Lankan spices.',
    ingredients: [
      '750g mutton, cut into pieces',
      '2 onions, sliced',
      '4 tomatoes, chopped',
      '1 cup coconut milk',
      '3 tbsp curry powder',
      '1 tsp chili powder',
      'Cinnamon, cardamom, cloves',
      'Curry leaves',
      'Salt to taste'
    ],
    steps: [
      'Marinate mutton with curry powder, chili powder, and salt.',
      'Sauté onions until golden, add whole spices.',
      'Add mutton and brown on all sides.',
      'Add tomatoes and cook until soft.',
      'Pour coconut milk and simmer for 1 hour until tender.',
      'Garnish with curry leaves.'
    ],
    tags: ['Spicy', 'Traditional', 'Festive'],
    servings: 6
  },
  {
    id: '12',
    title: 'String Hoppers',
    category: 'Breakfast',
    prepTime: '50 mins',
    difficulty: 'Medium',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Kiribath_%28milk_rice%29.jpg',
    description: 'Steamed rice noodle nests, a breakfast staple.',
    ingredients: [
      '2 cups red rice flour',
      '2 cups boiling water',
      '1 tsp salt',
      'Coconut oil for greasing'
    ],
    steps: [
      'Mix rice flour with salt and boiling water to form dough.',
      'Fill string hopper press with dough.',
      'Press into circular nests on greased string hopper trays.',
      'Steam for 8-10 minutes until cooked.',
      'Serve with curry and sambol.'
    ],
    tags: ['Breakfast', 'Traditional', 'Healthy'],
    servings: 8
  },
  {
    id: '13',
    title: 'Coconut Roti',
    category: 'Bread',
    prepTime: '35 mins',
    difficulty: 'Easy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Kiribath_%28milk_rice%29.jpg',
    description: 'Soft flatbread with fresh grated coconut.',
    ingredients: [
      '2 cups wheat flour',
      '1 cup grated coconut',
      '1 onion, finely chopped',
      '2 green chilies, chopped',
      '1 tsp salt',
      'Water as needed',
      'Oil for cooking'
    ],
    steps: [
      'Mix flour, coconut, onions, chilies, and salt.',
      'Add water gradually to form a soft dough.',
      'Divide into balls and roll into flat circles.',
      'Cook on a hot griddle until golden spots appear.',
      'Serve warm with curry or dhal.'
    ],
    tags: ['Breakfast', 'Quick', 'Vegetarian'],
    servings: 6
  },
  {
    id: '14',
    title: 'Crab Curry',
    category: 'Seafood',
    prepTime: '50 mins',
    difficulty: 'Advanced',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Srilankan_fish_curry.JPG',
    description: 'Rich and spicy Sri Lankan crab curry with coconut milk.',
    ingredients: [
      '2 large crabs, cleaned and cut',
      '2 onions, sliced',
      '1 cup coconut milk',
      '3 tbsp curry powder',
      '1 tsp chili powder',
      '1 tsp turmeric',
      'Curry leaves',
      'Tamarind paste',
      'Salt to taste'
    ],
    steps: [
      'Sauté onions and curry leaves until soft.',
      'Add curry powder, chili, turmeric, and cook spices.',
      'Add crab pieces and coat with spices.',
      'Pour coconut milk and tamarind, bring to boil.',
      'Simmer for 20 minutes until crab is cooked.',
      'Serve with rice or bread.'
    ],
    tags: ['Seafood', 'Spicy', 'Festive'],
    servings: 4
  },
  {
    id: '15',
    title: 'Ala Thel Dala (Fried Potatoes)',
    category: 'Side Dish',
    prepTime: '25 mins',
    difficulty: 'Easy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg',
    description: 'Crispy fried potato curry with onions and spices.',
    ingredients: [
      '4 large potatoes, cubed',
      '2 onions, sliced',
      '3 green chilies, sliced',
      'Curry leaves',
      '1 tsp chili powder',
      '1/2 tsp turmeric',
      'Mustard seeds',
      'Salt',
      'Oil for frying'
    ],
    steps: [
      'Parboil potato cubes and drain.',
      'Heat oil and temper with mustard seeds and curry leaves.',
      'Add onions and chilies, sauté until soft.',
      'Add potatoes, spices, and salt.',
      'Fry until crispy and golden.',
      'Serve as a side dish.'
    ],
    tags: ['Vegetarian', 'Quick', 'Side Dish'],
    servings: 4
  },
  {
    id: '16',
    title: 'Kokis',
    category: 'Dessert',
    prepTime: '1 hour',
    difficulty: 'Advanced',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Watalappan_%2823091763250%29.jpg',
    description: 'Traditional crispy sweet for Sinhala and Tamil New Year.',
    ingredients: [
      '2 cups rice flour',
      '1/2 cup coconut milk',
      '2 eggs',
      '1 tsp salt',
      '1 tsp sugar',
      'Oil for deep frying'
    ],
    steps: [
      'Mix rice flour, coconut milk, eggs, salt, and sugar into smooth batter.',
      'Heat oil for deep frying.',
      'Dip kokis mold into hot oil, then into batter.',
      'Fry in hot oil until golden and crispy.',
      'Drain and cool on paper towels.',
      'Store in airtight container.'
    ],
    tags: ['Dessert', 'Festive', 'Traditional'],
    servings: 20
  },
  {
    id: '17',
    title: 'Gotu Kola Sambol',
    category: 'Salad',
    prepTime: '15 mins',
    difficulty: 'Very Easy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg',
    description: 'Healthy herbal salad with gotu kola leaves.',
    ingredients: [
      '2 cups gotu kola leaves, chopped',
      '1 onion, finely chopped',
      '2 green chilies, sliced',
      '1/2 cup grated coconut',
      'Juice of 1 lime',
      'Salt to taste',
      'Maldive fish (optional)'
    ],
    steps: [
      'Wash and chop gotu kola leaves finely.',
      'Mix with onions, chilies, and grated coconut.',
      'Add lime juice, salt, and Maldive fish.',
      'Toss well and serve immediately.',
      'Great with rice and curry.'
    ],
    tags: ['Healthy', 'Vegetarian', 'Quick', 'Salad'],
    servings: 4
  },
  {
    id: '18',
    title: 'Milk Toffee',
    category: 'Dessert',
    prepTime: '40 mins',
    difficulty: 'Medium',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Watalappan_%2823091763250%29.jpg',
    description: 'Creamy Sri Lankan caramel candy.',
    ingredients: [
      '2 cups condensed milk',
      '1 cup sugar',
      '2 tbsp butter',
      '1 tsp vanilla',
      '1/2 cup cashews, chopped'
    ],
    steps: [
      'Combine condensed milk and sugar in a heavy pan.',
      'Cook on medium heat, stirring constantly.',
      'Add butter and continue stirring until mixture thickens.',
      'Test by dropping a bit in cold water - should form a soft ball.',
      'Add vanilla and cashews, pour into greased tray.',
      'Cool and cut into squares.'
    ],
    tags: ['Dessert', 'Sweet', 'Festive'],
    servings: 20
  },
  {
    id: '19',
    title: 'Tempered Beetroot',
    category: 'Side Dish',
    prepTime: '20 mins',
    difficulty: 'Easy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg',
    description: 'Vibrant beetroot curry with tempered spices.',
    ingredients: [
      '3 medium beetroots, cubed',
      '1 onion, sliced',
      'Curry leaves',
      'Mustard seeds',
      '1/2 tsp turmeric',
      '1 tsp chili powder',
      'Salt',
      'Oil'
    ],
    steps: [
      'Boil beetroot cubes until tender.',
      'Temper mustard seeds and curry leaves in oil.',
      'Add onions and sauté until soft.',
      'Add beetroot, spices, and salt.',
      'Stir well and cook for 5 minutes.',
      'Serve as a colorful side dish.'
    ],
    tags: ['Vegetarian', 'Healthy', 'Quick'],
    servings: 4
  },
  {
    id: '20',
    title: 'Lamprais',
    category: 'Festive',
    prepTime: '2 hours',
    difficulty: 'Advanced',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg',
    description: 'Dutch Burgher specialty - rice and curries baked in banana leaf.',
    ingredients: [
      '2 cups basmati rice',
      'Chicken curry',
      'Eggplant curry',
      'Seeni sambol',
      'Boiled eggs',
      'Fried fish cutlets',
      'Banana leaves',
      'Stock for cooking rice'
    ],
    steps: [
      'Cook rice in meat stock with spices.',
      'Prepare all curries and accompaniments.',
      'Cut banana leaves into squares and wilt over flame.',
      'Place rice in center, top with curries, egg, and cutlet.',
      'Wrap tightly and bake at 180°C for 30 minutes.',
      'Serve hot in the banana leaf parcel.'
    ],
    tags: ['Festive', 'Traditional', 'Special Occasion'],
    servings: 6
  }
];

export default sampleRecipes;
