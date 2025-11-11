import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../Components/RecipeCard';
import sampleRecipes from '../data/SampleRecipes';
import './Recipes.css';

const Recipes = () => {
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${base}/recipes`);
        if (!mounted) return;
        const apiRecipes = response.data?.data || response.data?.recipes || response.data || [];
        const demo = (() => {
          try {
            return JSON.parse(localStorage.getItem('recipes_demo') || '[]');
          } catch {
            return [];
          }
        })();
        const merged = [...demo, ...apiRecipes];
        setRecipes(merged.length ? merged : sampleRecipes);
        setError(null);
      } catch (err) {
        console.error('Failed to load recipes', err);
        if (mounted) {
          setError('We could not load new recipes. Showing Island Table favourites instead.');
          setRecipes(sampleRecipes);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadFavs = async () => {
      if (!isAuthenticated) return;
      try {
        const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${base}/me/favorites`, { withCredentials: true });
        if (!mounted) return;
        const favs = (res.data?.favorites || []).map((r) => r._id || r.id);
        setFavorites(favs);
      } catch (err) {
        console.error('Failed to load favorites from server', err);
      }
    };
    loadFavs();
    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  const categories = useMemo(() => {
    const unique = new Set(['All']);
    recipes.forEach((r) => {
      if (r.category) unique.add(r.category);
    });
    return Array.from(unique);
  }, [recipes]);

  const filtered = useMemo(() => {
    return recipes.filter((recipe) => {
      const title = (recipe.title || recipe.name || '').toLowerCase();
      const matchesQuery = query ? title.includes(query.toLowerCase()) : true;
      const matchesCategory = category === 'All' ? true : recipe.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category, recipes]);

  const toggleFavorite = (id) => {
    if (isAuthenticated) {
      const perform = async () => {
        try {
          const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
          const exists = favorites.includes(id);
          const method = exists ? 'delete' : 'post';
          const client = axios.create({ baseURL: base, withCredentials: true });
          const res = await client[method](`/me/favorites/${id}`);
          const favs = (res.data?.favorites || []).map((r) => r._id || r.id);
          setFavorites(favs);
        } catch (err) {
          console.error('Favorite toggle failed', err);
        }
      };
      perform();
      return;
    }

    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="recipes-page">
      <section className="recipes-hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="badge">Cook local, cook with heart</span>
            <h1 className="playfair">Sri Lankan recipe shelf</h1>
            <p>
              Search for a favourite dish or browse by mood. Each recipe explains the ingredients, spice level, and easy steps so anyone in your home can cook along.
            </p>
            <div className="hero-search">
              <label className="visually-hidden" htmlFor="recipe-search">Search recipes</label>
              <input
                id="recipe-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try ‘kottu’, ‘parippu’, or ‘hoppers’"
              />
            </div>
          </div>
          <div className="hero-image" aria-hidden="true">
            <img src="https://images.unsplash.com/photo-1624602546749-4b86465534f3?q=80&w=1240&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Sri Lankan curry spread" />
          </div>
        </div>
      </section>

      <div className="container">
        <div className="filter-row">
          <div className="filter-chips">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-chip ${item === category ? 'is-active' : ''}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="filter-meta">
            <span>{filtered.length} recipes</span>
            {error && <span className="filter-notice">{error}</span>}
          </div>
        </div>

        {loading ? (
          <div className="card loading-card">Loading seasonal menus...</div>
        ) : (
          <div className="recipe-results">
            {filtered.length ? (
              <div className="recipe-grid">
                {filtered.map((recipe) => (
                  <RecipeCard
                    key={recipe._id || recipe.id}
                    recipe={recipe}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.includes(recipe._id || recipe.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="card empty-card">
                <h3>No dishes found.</h3>
                <p>Try another word or explore a different category to spot more Sri Lankan favourites.</p>
                <button type="button" className="btn btn-primary" onClick={() => setCategory('All')}>
                  Reset filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
