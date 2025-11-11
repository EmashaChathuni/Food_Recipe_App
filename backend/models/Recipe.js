const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  prepTime: { type: String },
  difficulty: { type: String },
  image: { type: String },
  ingredients: [{ type: String }],
  steps: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
