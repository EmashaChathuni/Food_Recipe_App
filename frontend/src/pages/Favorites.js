import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../Components/RecipeCard';
import sampleRecipes from '../data/SampleRecipes';
import './Favorites.css';

const Favorites = () => {
  const { isAuthenticated } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [remoteRecipes, setRemoteRecipes] = useState([]);

  useEffect(() => {
    const handleStorage = () => {
      try {
        setFavoriteIds(JSON.parse(localStorage.getItem('favorites') || '[]'));
      } catch {
        setFavoriteIds([]);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadFavorites = async () => {
      if (!isAuthenticated) return;
      try {
        const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
        const client = axios.create({ baseURL: base, withCredentials: true });
        const response = await client.get('/me/favorites');
        if (!mounted) return;
        const favs = response.data?.favorites || [];
        setFavoriteIds(favs.map((item) => item._id || item.id));
        setRemoteRecipes(favs);
      } catch (error) {
        console.error('Failed to load favorites', error);
      }
    };

    loadFavorites();
    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  const allRecipes = useMemo(() => {
    const merged = [...remoteRecipes, ...sampleRecipes];
    const uniqueById = new Map();
    merged.forEach((recipe) => {
      const id = recipe._id || recipe.id;
      if (!uniqueById.has(id)) uniqueById.set(id, recipe);
    });
    return Array.from(uniqueById.values());
  }, [remoteRecipes]);

  const favoriteRecipes = allRecipes.filter((recipe) => favoriteIds.includes(recipe._id || recipe.id));

  const handleToggle = (id) => {
    if (isAuthenticated) {
      const toggle = async () => {
        try {
          const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
          const client = axios.create({ baseURL: base, withCredentials: true });
          const exists = favoriteIds.includes(id);
          const method = exists ? 'delete' : 'post';
          const res = await client[method](`/me/favorites/${id}`);
          const favs = (res.data?.favorites || []).map((item) => item._id || item.id);
          setFavoriteIds(favs);
        } catch (error) {
          console.error('Failed to toggle favorite', error);
        }
      };
      toggle();
      return;
    }

    setFavoriteIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="favorites-page">
      <section className="favorites-hero">
        <div className="container hero-box">
          <div>
            <span className="badge">Keep what you love</span>
            <h1 className="playfair">My saved dishes</h1>
            <p>
              Collect the recipes your family asks for, plan meals for the week, and mark dishes to try on the next long weekend. Sign in to keep favourites across devices.
            </p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <img src="https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=960&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Sri Lankan feast on a family table" />
          </div>
        </div>
      </section>

      <div className="container">
        {favoriteRecipes.length ? (
          <div className="favorite-grid">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard
                key={recipe._id || recipe.id}
                recipe={recipe}
                onToggleFavorite={handleToggle}
                isFavorite={favoriteIds.includes(recipe._id || recipe.id)}
              />
            ))}
          </div>
        ) : (
          <div className="card empty-state">
            <h3>No saved dishes yet</h3>
            <p>Browse Island Table and tap the heart icon to build your own Sri Lankan menu.</p>
            <Link className="btn btn-primary" to="/recipes">Find recipes</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
