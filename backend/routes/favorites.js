const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

// Get current user's favorites (populated)
router.get('/', auth, async (req, res) => {
  try {
    // populate favorites (works with modern mongoose)
    await req.user.populate({ path: 'favorites', options: { sort: { createdAt: -1 } } });
    const favorites = Array.isArray(req.user.favorites) ? req.user.favorites : [];
    res.json({ success: true, favorites });
  } catch (err) {
    console.error('Failed to fetch favorites:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch favorites' });
  }
});

// Add a recipe to favorites
router.post('/:recipeId', auth, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });

    // Prevent duplicates
    const exists = req.user.favorites?.some(id => id.toString() === recipeId);
    if (exists) return res.json({ success: true, message: 'Already favorited', favorites: req.user.favorites });

    req.user.favorites = req.user.favorites || [];
    req.user.favorites.push(recipe._id);
    await req.user.save();

    await req.user.populate('favorites');

    res.json({ success: true, message: 'Added to favorites', favorites: req.user.favorites });
  } catch (err) {
    console.error('Failed to add favorite:', err);
    res.status(500).json({ success: false, message: 'Failed to add favorite' });
  }
});

// Remove a recipe from favorites
router.delete('/:recipeId', auth, async (req, res) => {
  try {
    const { recipeId } = req.params;
    if (!req.user.favorites || !req.user.favorites.length) {
      return res.status(404).json({ success: false, message: 'No favorites found' });
    }

    const newFavorites = req.user.favorites.filter(id => id.toString() !== recipeId);
    req.user.favorites = newFavorites;
    await req.user.save();

    await req.user.populate('favorites');

    res.json({ success: true, message: 'Removed from favorites', favorites: req.user.favorites });
  } catch (err) {
    console.error('Failed to remove favorite:', err);
    res.status(500).json({ success: false, message: 'Failed to remove favorite' });
  }
});

module.exports = router;
