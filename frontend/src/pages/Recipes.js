import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../Components/RecipeCard';
import RecipeCardSkeleton from '../Components/RecipeCardSkeleton';
import sampleRecipes from '../data/SampleRecipes';
import './Recipes.css';

const Recipes = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
        const [recipesRes, trendingRes, tagsRes] = await Promise.all([
          axios.get(`${base}/recipes`),
          axios.get(`${base}/recipes/trending/top?limit=3`).catch(() => ({ data: [] })),
          axios.get(`${base}/tags`).catch(() => ({ data: [] }))
        ]);
        
        if (!mounted) return;
        
        const apiRecipes = recipesRes.data?.data || recipesRes.data?.recipes || recipesRes.data || [];
        const demo = (() => {
          try {
            return JSON.parse(localStorage.getItem('recipes_demo') || '[]');
          } catch {
            return [];
          }
        })();
        const merged = [...demo, ...apiRecipes];
        setRecipes(merged.length ? merged : sampleRecipes);
        setTrendingRecipes(trendingRes.data || []);
        setAllTags(tagsRes.data || []);
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

  const difficulties = ['All', 'Easy', 'Intermediate', 'Advanced'];

  const filtered = useMemo(() => {
    return recipes.filter((recipe) => {
      const title = (recipe.title || recipe.name || '').toLowerCase();
      const description = (recipe.description || '').toLowerCase();
      const ingredients = (recipe.ingredients || []).join(' ').toLowerCase();
      const searchText = query.toLowerCase();
      
      const matchesQuery = query ? (
        title.includes(searchText) || 
        description.includes(searchText) || 
        ingredients.includes(searchText)
      ) : true;
      
      const matchesCategory = category === 'All' ? true : recipe.category === category;
      const matchesDifficulty = difficulty === 'All' ? true : recipe.difficulty === difficulty;
      const matchesTag = selectedTag ? (recipe.tags || []).includes(selectedTag) : true;
      
      return matchesQuery && matchesCategory && matchesDifficulty && matchesTag;
    });
  }, [query, category, difficulty, selectedTag, recipes]);

  const handleRandomRecipe = async () => {
    try {
      const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${base}/recipes/random/one`);
      const randomRecipe = res.data;
      navigate(`/recipes/${randomRecipe._id || randomRecipe.id}`);
    } catch (err) {
      const random = recipes[Math.floor(Math.random() * recipes.length)];
      if (random) {
        navigate(`/recipes/${random._id || random.id}`);
      }
    }
  };

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
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try 'kottu', 'parippu', or 'hoppers'"
              />
              <button className="random-btn" onClick={handleRandomRecipe} title="Surprise me">
                🎲 Random
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/07/Lunumiris_with_Appam.JPG" 
              alt="Sri Lankan curry spread"
              onError={(e) => {
                e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg';
              }}
            />
          </div>
        </div>
      </section>

      {trendingRecipes.length > 0 && (
        <section className="trending-section">
          <div className="container">
            <h2>🔥 Trending Recipes</h2>
            <div className="trending-grid">
              {trendingRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id || recipe.id}
                  recipe={recipe}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.includes(recipe._id || recipe.id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container">
        <div className="filters-section">
          <div className="filter-group">
            <label>Category</label>
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
          </div>

          <div className="filter-group">
            <label>Difficulty</label>
            <div className="filter-chips">
              {difficulties.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`filter-chip ${item === difficulty ? 'is-active' : ''}`}
                  onClick={() => setDifficulty(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="filter-group">
              <label>Tags</label>
              <div className="filter-chips">
                <button
                  type="button"
                  className={`filter-chip ${!selectedTag ? 'is-active' : ''}`}
                  onClick={() => setSelectedTag('')}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`filter-chip ${tag === selectedTag ? 'is-active' : ''}`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="filter-meta">
            <span>{filtered.length} recipes found</span>
            {error && <span className="filter-notice">{error}</span>}
          </div>
        </div>

        {loading ? (
          <div className="recipe-grid">
            {[...Array(6)].map((_, i) => (
              <RecipeCardSkeleton key={i} />
            ))}
          </div>
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
              <div className="empty-state">
                <h3>No dishes found.</h3>
                <p>Try another word or explore a different category to spot more Sri Lankan favourites.</p>
                <button type="button" className="btn-reset" onClick={() => {
                  setCategory('All');
                  setDifficulty('All');
                  setSelectedTag('');
                  setQuery('');
                }}>
                  Reset all filters
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
