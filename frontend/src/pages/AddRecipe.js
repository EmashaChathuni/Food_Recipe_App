import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddRecipe.css';

const initialForm = {
  title: '',
  category: '',
  prepTime: '',
  difficulty: '',
  image: '',
  ingredients: '',
  steps: '',
};

const AddRecipe = () => {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    const payload = {
      title: form.title,
      category: form.category,
      prepTime: form.prepTime,
      difficulty: form.difficulty,
  image: form.image || 'https://images.unsplash.com/photo-1626082927389-6cd609f34ab1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      ingredients: form.ingredients.split('\n').map((item) => item.trim()).filter(Boolean),
      steps: form.steps.split('\n').map((item) => item.trim()).filter(Boolean),
    };

    try {
      const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
      await axios.post(`${base}/recipes`, payload, { withCredentials: true });
      setMessage('Recipe saved and shared with Island Table.');
      setTimeout(() => navigate('/recipes'), 600);
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
  setMessage('Saved to this device. Sign in later to keep it across devices.');
      setTimeout(() => navigate('/recipes'), 800);
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
          <div className="hero-panel" aria-hidden="true">
            <img src="https://images.unsplash.com/photo-1588166745650-771ecfcf35c1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Home cook preparing Sri Lankan ingredients" />
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
              <label htmlFor="category">Category</label>
              <input id="category" name="category" value={form.category} onChange={handleChange} placeholder="Breakfast, Curry, Street Food..." />
            </div>
            <div className="form-row">
              <label htmlFor="prepTime">Prep time</label>
              <input id="prepTime" name="prepTime" value={form.prepTime} onChange={handleChange} placeholder="E.g. 45 mins" />
            </div>
            <div className="form-row">
              <label htmlFor="difficulty">Difficulty</label>
              <input id="difficulty" name="difficulty" value={form.difficulty} onChange={handleChange} placeholder="Easy, Medium, or Festive" />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="image">Cover image URL</label>
            <input id="image" name="image" value={form.image} onChange={handleChange} placeholder="https://" />
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
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
