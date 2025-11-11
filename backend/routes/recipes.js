const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET /api/recipes - list all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: recipes });
  } catch (err) {
    console.error('GET /api/recipes error', err);
    res.status(500).json({ success: false, message: 'Failed to fetch recipes' });
  }
});

// GET /api/recipes/:id
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).lean();
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });
    res.json({ success: true, data: recipe });
  } catch (err) {
    console.error('GET /api/recipes/:id error', err);
    res.status(500).json({ success: false, message: 'Failed to fetch recipe' });
  }
});

// POST /api/recipes - create a recipe
router.post('/', async (req, res) => {
  try {
    const { title, category, prepTime, difficulty, image, ingredients = [], steps = [] } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

    const recipe = new Recipe({ title, category, prepTime, difficulty, image, ingredients, steps });
    await recipe.save();
    res.status(201).json({ success: true, data: recipe });
  } catch (err) {
    console.error('POST /api/recipes error', err);
    res.status(500).json({ success: false, message: 'Failed to create recipe' });
  }
});

// PUT /api/recipes/:id - update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!updated) return res.status(404).json({ success: false, message: 'Recipe not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('PUT /api/recipes/:id error', err);
    res.status(500).json({ success: false, message: 'Failed to update recipe' });
  }
});

// DELETE /api/recipes/:id
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Recipe.findByIdAndDelete(req.params.id).lean();
    if (!removed) return res.status(404).json({ success: false, message: 'Recipe not found' });
    res.json({ success: true, message: 'Recipe deleted' });
  } catch (err) {
    console.error('DELETE /api/recipes/:id error', err);
    res.status(500).json({ success: false, message: 'Failed to delete recipe' });
  }
});

module.exports = router;
