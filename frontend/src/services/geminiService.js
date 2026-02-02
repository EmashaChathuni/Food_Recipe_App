import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');

/**
 * Search for recipes using Gemini AI
 * @param {string} searchQuery - The search term from the user
 * @returns {Promise<Array>} - Array of recipe objects
 */
export const searchRecipesWithAI = async (searchQuery) => {
  try {
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      console.error('Gemini API key is not configured');
      return [];
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create a detailed prompt for recipe search
    const prompt = `You are a Sri Lankan food recipe expert. A user is searching for: "${searchQuery}"

Please provide 3-5 Sri Lankan recipes related to this search. For each recipe, provide the following information in this EXACT JSON format:

{
  "recipes": [
    {
      "title": "Recipe Name",
      "description": "A brief 1-2 sentence description",
      "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"],
      "instructions": ["step 1", "step 2", "step 3"],
      "prepTime": "time in minutes (number only)",
      "cookTime": "time in minutes (number only)",
      "servings": "number of servings (number only)",
      "difficulty": "Easy, Medium, or Hard",
      "category": "Breakfast, Curry, Seafood, Dessert, Snacks, or Beverages",
      "cuisine": "Sri Lankan",
      "tags": ["tag1", "tag2", "tag3"]
    }
  ]
}

Important:
- Only return valid JSON, no additional text
- Include authentic Sri Lankan recipes
- If the search is not food-related, return recipes for popular Sri Lankan dishes
- Keep descriptions concise and engaging
- Preptime and cooktime should be numbers only (e.g., 30, not "30 minutes")`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    try {
      // Remove any markdown code blocks if present
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const data = JSON.parse(cleanedText);
      
      if (data.recipes && Array.isArray(data.recipes)) {
        // Transform AI recipes to match our RecipeCard component format
        return data.recipes.map((recipe, index) => ({
          id: `ai-${Date.now()}-${index}`,
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients || [],
          instructions: recipe.instructions || [],
          prepTime: parseInt(recipe.prepTime) || 30,
          cookTime: parseInt(recipe.cookTime) || 30,
          servings: parseInt(recipe.servings) || 4,
          difficulty: recipe.difficulty || 'Medium',
          category: recipe.category || 'General',
          cuisine: 'Sri Lankan',
          tags: recipe.tags || [],
          image: getDefaultImageForCategory(recipe.category),
          rating: 0,
          reviews: [],
          isAIGenerated: true // Flag to identify AI-generated recipes
        }));
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.log('AI Response:', text);
    }

    return [];
  } catch (error) {
    console.error('Error searching recipes with AI:', error);
    return [];
  }
};

/**
 * Get a default image based on recipe category
 * @param {string} category - Recipe category
 * @returns {string} - Image URL
 */
const getDefaultImageForCategory = (category) => {
  const categoryImages = {
    'Breakfast': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Lunumiris_with_Appam.JPG',
    'Curry': 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg',
    'Seafood': 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Srilankan_fish_curry.JPG',
    'Dessert': 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Watalappan_%2823091763250%29.jpg',
    'Snacks': 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg',
    'Beverages': 'https://upload.wikimedia.org/wikipedia/commons/1/17/Kiribath_%28milk_rice%29.jpg'
  };

  return categoryImages[category] || 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg';
};

export default { searchRecipesWithAI };
