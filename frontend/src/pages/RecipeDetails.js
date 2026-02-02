import React, { useState, useEffect } from 'react';
import './RecipeDetails.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../Components/StarRating';
import ReviewSection from '../Components/ReviewSection';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(4);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const local = (() => {
          try {
            return JSON.parse(localStorage.getItem('recipes_demo') || '[]');
          } catch {
            return [];
          }
        })();
        const foundLocal = local.find((r) => (r.id === id) || (r._id === id));
        if (foundLocal) {
          if (mounted) {
            setRecipe(foundLocal);
            setServings(foundLocal.servings || 4);
          }
          return;
        }
        const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${base}/recipes/${id}`);
        const data = res.data?.data || res.data?.recipe || res.data;
        if (mounted) {
          setRecipe(data);
          setServings(data.servings || 4);
        }
      } catch (err) {
        console.error('Failed to load recipe', err);
        if (mounted) setRecipe(null);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title || recipe.name,
        text: recipe.description || 'Check out this recipe!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const adjustServings = (newServings) => {
    if (newServings >= 1 && newServings <= 20) {
      setServings(newServings);
    }
  };

  const scaleIngredient = (ingredient) => {
    if (!recipe.servings) return ingredient;
    const ratio = servings / recipe.servings;
    return ingredient.replace(/(\d+(?:\.\d+)?)/g, (match) => {
      const num = parseFloat(match);
      return (num * ratio).toFixed(1).replace(/\.0$/, '');
    });
  };

  if (!recipe) return <div className="container py-8">Loading recipe...</div>;

  return (
    <div className="recipe-details-page">
      <div className="recipe-details-container no-print">
        <div className="recipe-main">
          <div className="recipe-image-wrapper">
            <img 
              src={recipe.image || 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg'} 
              alt={recipe.title || recipe.name} 
            />
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="recipe-tags-overlay">
                {recipe.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="recipe-header">
            <h1>{recipe.title || recipe.name}</h1>
            {recipe.avgRating > 0 && (
              <div className="recipe-rating">
                <StarRating rating={recipe.avgRating} readonly size="small" />
                <span>({recipe.reviewCount} reviews)</span>
              </div>
            )}
            <p className="recipe-meta">{recipe.category || 'Sri Lankan'} • {recipe.prepTime || '30 mins'} • {recipe.difficulty || 'Easy'}</p>
            {recipe.description && <p className="recipe-description">{recipe.description}</p>}
            
            <div className="recipe-actions">
              <button onClick={handleShare} className="btn-secondary">
                Share
              </button>
              <button onClick={handlePrint} className="btn-secondary">
                Print
              </button>
            </div>
          </div>

          <section className="recipe-section">
            <div className="section-header">
              <h3>Ingredients</h3>
              <div className="servings-calculator">
                <button onClick={() => adjustServings(servings - 1)}>−</button>
                <span>{servings} servings</span>
                <button onClick={() => adjustServings(servings + 1)}>+</button>
              </div>
            </div>
            <ul className="ingredients-list">
              {(recipe.ingredients || []).map((ing, i) => (
                <li key={i} className={checkedIngredients.includes(i) ? 'checked' : ''}>
                  <input
                    type="checkbox"
                    checked={checkedIngredients.includes(i)}
                    onChange={() => toggleIngredient(i)}
                  />
                  <span>{scaleIngredient(ing)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="recipe-section">
            <h3>Instructions</h3>
            <ol className="steps-list">
              {(recipe.steps || []).map((s, i) => (
                <li key={i}>
                  <div className="step-number">{i + 1}</div>
                  <p>{s}</p>
                </li>
              ))}
            </ol>
          </section>

          <ReviewSection
            recipeId={id}
            reviews={recipe.reviews}
            avgRating={recipe.avgRating}
            onReviewSubmit={(newReviews) => setRecipe({...recipe, reviews: newReviews})}
          />
        </div>

        <aside className="recipe-sidebar">
          <div className="sidebar-card">
            <h4>Recipe Info</h4>
            <div className="info-item">
              <span className="label">Prep Time</span>
              <span className="value">{recipe.prepTime || '30 mins'}</span>
            </div>
            <div className="info-item">
              <span className="label">Difficulty</span>
              <span className="value">{recipe.difficulty || 'Easy'}</span>
            </div>
            <div className="info-item">
              <span className="label">Category</span>
              <span className="value">{recipe.category || 'Main Dish'}</span>
            </div>
            {recipe.authorName && (
              <div className="info-item">
                <span className="label">Author</span>
                <span className="value">{recipe.authorName}</span>
              </div>
            )}
          </div>
        </aside>
      </div>

      <div className="print-only">
        <h1>{recipe.title || recipe.name}</h1>
        <p>{recipe.description}</p>
        <h2>Ingredients ({servings} servings)</h2>
        <ul>
          {(recipe.ingredients || []).map((ing, i) => (
            <li key={i}>{scaleIngredient(ing)}</li>
          ))}
        </ul>
        <h2>Instructions</h2>
        <ol>
          {(recipe.steps || []).map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetails;
