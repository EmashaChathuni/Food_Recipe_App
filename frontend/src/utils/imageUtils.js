// Reliable food image URLs from multiple CDNs
const FALLBACK_IMAGES = {
  default: 'https://via.placeholder.com/500x400/f0f0f0/999?text=Recipe+Image',
  noodles: 'https://via.placeholder.com/500x400/ff6b6b/fff?text=Noodles',
  rice: 'https://via.placeholder.com/500x400/ffd93d/fff?text=Rice+Dish',
  curry: 'https://via.placeholder.com/500x400/6bcf7f/fff?text=Curry',
  salad: 'https://via.placeholder.com/500x400/4d96ff/fff?text=Salad',
  dessert: 'https://via.placeholder.com/500x400/ff99cc/fff?text=Dessert',
  breakfast: 'https://via.placeholder.com/500x400/ffb366/fff?text=Breakfast',
  beverage: 'https://via.placeholder.com/500x400/66ccff/fff?text=Beverage',
  snack: 'https://via.placeholder.com/500x400/cc99ff/fff?text=Snack',
};

// Alternative reliable image sources
const ALTERNATIVE_IMAGES = {
  'Spicy Chicken Noodles': 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?w=500&h=400&fit=crop',
  'Quick Deviled Potatoes': 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?w=500&h=400&fit=crop',
  'Thai Green Curry': 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?w=500&h=400&fit=crop',
  'Chicken Stir-Fry': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=400&fit=crop',
  'Egg Fried Rice': 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?w=500&h=400&fit=crop',
  'Chicken Sandwich': 'https://images.pexels.com/photos/5737452/pexels-photo-5737452.jpeg?w=500&h=400&fit=crop',
  'Fruit Salad': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=400&fit=crop',
  'Mini Pizza': 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?w=500&h=400&fit=crop',
  'Sausage Rolls': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=400&fit=crop',
  'Vegetable Samosa': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=400&fit=crop',
  'Simple Muffins': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=400&fit=crop',
  'Chicken Biryani': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=400&fit=crop',
  'Roast Chicken': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=400&fit=crop',
  'Lamprais': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=400&fit=crop',
  'Seafood Fry': 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?w=500&h=400&fit=crop',
  'Pancakes': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=400&fit=crop',
  'Banana Smoothie': 'https://images.pexels.com/photos/143669/pexels-photo-143669.jpeg?w=500&h=400&fit=crop',
  'Tropical Açaí Bowl': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=400&fit=crop',
};

/**
 * Get a fallback image based on category/subcategory
 */
export const getFallbackImage = (category, subcategory) => {
  if (!category) return FALLBACK_IMAGES.default;
  
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('noodle') || categoryLower.includes('pasta')) {
    return FALLBACK_IMAGES.noodles;
  } else if (categoryLower.includes('rice') || categoryLower.includes('biryani')) {
    return FALLBACK_IMAGES.rice;
  } else if (categoryLower.includes('curry')) {
    return FALLBACK_IMAGES.curry;
  } else if (categoryLower.includes('salad') || categoryLower.includes('bowl')) {
    return FALLBACK_IMAGES.salad;
  } else if (categoryLower.includes('dessert') || categoryLower.includes('sweet')) {
    return FALLBACK_IMAGES.dessert;
  } else if (categoryLower.includes('breakfast')) {
    return FALLBACK_IMAGES.breakfast;
  } else if (categoryLower.includes('beverage') || categoryLower.includes('juice') || categoryLower.includes('smoothie')) {
    return FALLBACK_IMAGES.beverage;
  } else if (categoryLower.includes('snack') || categoryLower.includes('appetizer')) {
    return FALLBACK_IMAGES.snack;
  }
  
  return FALLBACK_IMAGES.default;
};

/**
 * Get image URL with fallback - tries multiple sources
 */
export const getImageUrl = (recipe) => {
  if (!recipe) return FALLBACK_IMAGES.default;
  
  // First, check if there's a recipe-specific alternative
  if (ALTERNATIVE_IMAGES[recipe.title]) {
    return ALTERNATIVE_IMAGES[recipe.title];
  }
  
  // Then try the provided image URL
  if (recipe.image) {
    return recipe.image;
  }
  
  // Finally, use category-based fallback
  return getFallbackImage(recipe.category, recipe.subcategory);
};

/**
 * Create a proxy function to handle image errors
 */
export const handleImageError = (event, recipe) => {
  if (event && event.target) {
    const fallback = getFallbackImage(recipe?.category, recipe?.subcategory);
    if (event.target.src !== fallback) {
      event.target.src = fallback;
    }
  }
};

/**
 * Preload images for better performance
 */
export const preloadImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => resolve(imageUrl);
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
  });
};
