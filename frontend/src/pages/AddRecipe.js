import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { RECIPE_CATEGORIES, getSubcategories } from '../data/categories';
import './AddRecipe.css';

const initialForm = {
  title: '',
  category: '',
  subcategory: '',
  prepTime: '',
  cookingTime: '',
  difficulty: '',
  image: '',
  ingredients: '',
  steps: '',
  tags: '',
  servings: '4',
};

const AddRecipe = () => {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  const categories = Object.keys(RECIPE_CATEGORIES);

  useEffect(() => {
    // Update subcategories when category changes
    if (form.category) {
      const subs = getSubcategories(form.category);
      setSubcategories(subs.map(sub => sub.name));
      setForm(prev => ({ ...prev, subcategory: '' })); // Reset subcategory
    }
  }, [form.category]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    if (name === 'image' && value) {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!isAuthenticated) {
      setMessage('');
      navigate('/login?redirect=/create');
      return;
    }
    
    setSaving(true);
    setMessage('');

    const payload = {
      title: form.title,
      category: form.category,
      subcategory: form.subcategory,
      prepTime: form.prepTime,
      cookingTime: form.cookingTime,
      difficulty: form.difficulty,
      image: form.image || 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg',
      ingredients: form.ingredients.split('\n').map((item) => item.trim()).filter(Boolean),
      steps: form.steps.split('\n').map((item) => item.trim()).filter(Boolean),
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      servings: parseInt(form.servings) || 4,
      addedByUser: true,
    };

    try {
      const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
      await axios.post(`${base}/recipes`, payload, { withCredentials: true });
      setMessage('🎉 Recipe shared! It will appear in All Dishes under "Added by valued users".');
      setTimeout(() => navigate('/recipes'), 1200);
    } catch (error) {
      console.error('Failed to save recipe', error);
      const newRecipe = { id: String(Date.now()), ...payload };
      const existing = (() => {
        try {
          return JSON.parse(localStorage.getItem('recipes_demo') || '[]');
        } catch {
          return [];
        }
      })();
      localStorage.setItem('recipes_demo', JSON.stringify([newRecipe, ...existing]));
      setMessage('✓ Recipe saved locally. Sign in later to keep it across all devices.');
      setTimeout(() => navigate('/recipes'), 1000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="create-page">
      <section className="create-hero">
        <div className="container create-layout">
          <div>
            <span className="badge">From your kitchen to ours</span>
            <h1 className="playfair">Share your Sri Lankan recipe</h1>
            <p>
              Tell us how you cook it, what makes it special, and the small tips you never forget. We turn your notes into a friendly guide for every Island Table cook.
            </p>
          </div>
          <div className="hero-panel">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg" 
              alt="Home cook preparing Sri Lankan ingredients"
              onError={(e) => {
                e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg';
              }}
            />
          </div>
        </div>
      </section>

      <div className="container form-wrapper">
        {message && <div className="card status-message">{message}</div>}
        <form className="card recipe-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="title">Recipe title</label>
            <input id="title" name="title" value={form.title} onChange={handleChange} required placeholder="E.g. Spicy Jaffna Crab Curry" />
          </div>

          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="category">Category *</label>
              <select id="category" name="category" value={form.category} onChange={handleChange} required>
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="form-row">
              <label htmlFor="subcategory">Subcategory {form.category && '*'}</label>
              <select id="subcategory" name="subcategory" value={form.subcategory} onChange={handleChange} disabled={!form.category}>
                <option value="">Select a subcategory</option>
                {subcategories.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="prepTime">Prep Time</label>
              <input id="prepTime" name="prepTime" value={form.prepTime} onChange={handleChange} placeholder="e.g. 15 mins" />
            </div>

            <div className="form-row">
              <label htmlFor="cookingTime">Cooking Time</label>
              <input id="cookingTime" name="cookingTime" value={form.cookingTime} onChange={handleChange} placeholder="e.g. 30 mins" />
            </div>

            <div className="form-row">
              <label htmlFor="difficulty">Difficulty</label>
              <select id="difficulty" name="difficulty" value={form.difficulty} onChange={handleChange}>
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="servings">Servings</label>
              <input id="servings" name="servings" type="number" min="1" max="20" value={form.servings} onChange={handleChange} placeholder="4" />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="tags">Tags</label>
            <input id="tags" name="tags" value={form.tags} onChange={handleChange} placeholder="Spicy, Vegetarian, Quick, Festival" />
            <span className="field-hint">Separate tags with commas. E.g: Spicy, Quick, Vegetarian</span>
          </div>

          <div className="form-row">
            <label htmlFor="image">Cover image URL</label>
            <input id="image" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
            {imagePreview && (
              <div className="image-preview">
                <img 
                  src={imagePreview} 
                  alt="Recipe preview"
                  onError={(e) => {
                    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg';
                    setImagePreview('');
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="ingredients">Ingredients list</label>
            <textarea
              id="ingredients"
              name="ingredients"
              rows={5}
              value={form.ingredients}
              onChange={handleChange}
              placeholder={'1 kg chicken\n2 cups scraped coconut\n1 sprig curry leaves'}
            />
            <span className="field-hint">Enter each ingredient on a new line for clear shopping lists.</span>
          </div>

          <div className="form-row">
            <label htmlFor="steps">Steps &amp; plating notes</label>
            <textarea
              id="steps"
              name="steps"
              rows={6}
              value={form.steps}
              onChange={handleChange}
              placeholder={'Toast the spices on low heat\nAdd coconut milk and simmer 10 minutes\nServe warm with string hoppers'}
            />
            <span className="field-hint">Share the small tips—heat level, when to add coconut milk, or what to serve it with.</span>
          </div>

          <div className="form-actions">
            {!isAuthenticated ? (
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => navigate('/login?redirect=/create')}
              >
                🔐 Please login to share recipe
              </button>
            ) : (
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving…' : '✓ Share this recipe'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
