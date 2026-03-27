import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../Components/RecipeCard';
import RecipeCardSkeleton from '../Components/RecipeCardSkeleton';
import sampleRecipes from '../data/SampleRecipes';
import { RECIPE_CATEGORIES, getSubcategories } from '../data/categories';
import { searchRecipesWithAI } from '../services/geminiService';
import './Recipes.css';

const Recipes = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [aiRecipes, setAiRecipes] = useState([]);
  const [isAISearch, setIsAISearch] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'categories' or 'grid'

  const mainCategories = Object.keys(RECIPE_CATEGORIES);
  const subcategories = selectedCategory !== 'All' ? getSubcategories(selectedCategory).map(sub => sub.name) : [];

  // Initialize search and filters from URL parameters
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    const occasionParam = searchParams.get('occasion');
    
    if (searchParam) {
      setQuery(searchParam);
      handleAISearch(searchParam);
    } else {
      setAiRecipes([]);
      setIsAISearch(false);
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setViewMode('grid');
    }
    if (occasionParam) {
      setSelectedOccasion(occasionParam);
      setViewMode('grid');
    }
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
        const [recipesRes, tagsRes] = await Promise.all([
          axios.get(`${base}/recipes`),
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

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filtered = useMemo(() => {
    if (isAISearch && aiRecipes.length > 0) {
      return aiRecipes;
    }
    
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
      
      const matchesCategory = selectedCategory === 'All' ? true : recipe.category === selectedCategory;
      const matchesSubcategory = selectedSubcategory ? recipe.subcategory === selectedSubcategory : true;
      const matchesDifficulty = difficulty === 'All' ? true : recipe.difficulty === difficulty;
      const matchesOccasion = selectedOccasion ? (recipe.occasions || []).includes(selectedOccasion) : true;
      
      return matchesQuery && matchesCategory && matchesSubcategory && matchesDifficulty && matchesOccasion;
    });
  }, [query, selectedCategory, selectedSubcategory, difficulty, selectedOccasion, recipes, isAISearch, aiRecipes]);

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

  const handleAISearch = async (searchQuery) => {
    if (!searchQuery || searchQuery.trim() === '') {
      setIsAISearch(false);
      setAiRecipes([]);
      return;
    }

    setAiLoading(true);
    setIsAISearch(true);
    
    try {
      const results = await searchRecipesWithAI(searchQuery);
      
      if (results.length === 0) {
        setIsAISearch(false);
        setAiRecipes([]);
        setError(null);
      } else {
        setAiRecipes(results);
        setError(null);
      }
    } catch (err) {
      console.error('AI search failed:', err);
      setIsAISearch(false);
      setAiRecipes([]);
      setError(null);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="recipes-page">
      {/* Hero Section */}
      <section className="recipes-hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="badge">Cook local, cook with heart</span>
            <h1 className="playfair">Explore & Cook</h1>
            <p>
              Browse by category or search for your favorite dish. Each recipe comes with ingredients, cooking time, difficulty level, and step-by-step instructions.
            </p>
            <div className="hero-search">
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  if (event.target.value) handleAISearch(event.target.value);
                }}
                placeholder="Search recipes, ingredients..."
              />
              <button className="random-btn" onClick={handleRandomRecipe} title="Surprise me">
                🎲 Random
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&h=400&fit=crop" 
              alt="Sri Lankan cuisine"
              onError={(e) => {
                e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg';
              }}
            />
          </div>
        </div>
      </section>

      <div className="container">
        {/* Category Browse Section */}
        {!query && (
          <section className="categories-browse">
            <h2>Browse by Category</h2>
            <div className="categories-showcase">
              {mainCategories.map((cat) => {
                const categoryData = RECIPE_CATEGORIES[cat];
                const isSelected = selectedCategory === cat;
                return (
                  <div
                    key={cat}
                    className={`category-showcase-card ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(isSelected ? 'All' : cat);
                      setSelectedSubcategory('');
                      setViewMode('grid');
                    }}
                    style={{ '--category-color': categoryData.color }}
                  >
                    <div className="showcase-image">
                      <img
                        src={categoryData.image}
                        alt={cat}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=' + cat;
                        }}
                      />
                    </div>
                    <div className="showcase-content">
                      <span className="showcase-icon">{categoryData.icon}</span>
                      <h3>{cat}</h3>
                      <p className="showcase-description">{categoryData.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Subcategories Section */}
        {selectedCategory !== 'All' && subcategories.length > 0 && (
          <section className="subcategories-browse">
            <div className="subcategories-header">
              <button 
                className="back-to-categories"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedSubcategory('');
                }}
              >
                ← Back to Categories
              </button>
              <h2>
                {RECIPE_CATEGORIES[selectedCategory].icon} {selectedCategory} - Choose a subcategory
              </h2>
            </div>
            <div className="subcategories-grid">
              {subcategories.map((sub) => {
                const subData = getSubcategories(selectedCategory).find(s => s.name === sub);
                const isSelected = selectedSubcategory === sub;
                return (
                  <div
                    key={sub}
                    className={`subcategory-card ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedSubcategory(isSelected ? '' : sub)}
                  >
                    <div className="subcategory-image">
                      <img
                        src={subData?.image}
                        alt={sub}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/250x200?text=' + sub;
                        }}
                      />
                    </div>
                    <div className="subcategory-info">
                      <h4>{sub}</h4>
                      <p>{subData?.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Filters Section */}
        <section className="filters-section">
          <div className="filter-group">
            <label>Difficulty Level</label>
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

          <div className="filter-meta">
            <span className="recipe-count">
              {filtered.length} recipe{filtered.length !== 1 ? 's' : ''} found
            </span>
            {error && <span className="filter-notice">⚠️ {error}</span>}
          </div>
        </section>

        {/* Recipes Grid */}
        <section className="recipes-results">
          {loading || aiLoading ? (
            <div className="recipe-grid">
              {[...Array(6)].map((_, i) => (
                <RecipeCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
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
              <h3>🔍 No recipes found</h3>
              <p>Try adjusting your filters or search for something different.</p>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('All');
                  setSelectedSubcategory('');
                  setDifficulty('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Recipes;
