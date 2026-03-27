import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { getImageUrl, handleImageError } from '../utils/imageUtils';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onToggleFavorite, isFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const id = recipe._id || recipe.id;
  const image = getImageUrl(recipe);
  const category = recipe.category || 'Seasonal';
  const prep = recipe.prepTime || '30 mins';
  const difficulty = recipe.difficulty || 'Intermediate';
  const isUserAdded = recipe.addedByUser;

  return (
    <article className="recipe-card-tile">
      <Link to={`/recipes/${id}`} className="recipe-card-link" aria-label={`Open ${recipe.title || recipe.name}`}>
        <div className="recipe-card-media">
          <img 
            src={image} 
            alt={recipe.title || recipe.name}
            onError={(e) => handleImageError(e, recipe)}
            onLoad={() => setImageLoaded(true)}
            className={imageLoaded ? 'loaded' : 'loading'}
          />
          <span className="recipe-card-category">{category}</span>
          {isUserAdded && <span className="recipe-card-badge">👥 Added by valued users</span>}
        </div>
      </Link>
      <div className="recipe-card-body">
        <div className="recipe-card-header">
          <Link to={`/recipes/${id}`} className="recipe-card-title">
            {recipe.title || recipe.name}
          </Link>
          <button type="button" className={`recipe-card-favorite ${isFavorite ? 'is-active' : ''}`} onClick={() => onToggleFavorite(id)} aria-pressed={isFavorite}>
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
        {recipe.avgRating > 0 && (
          <div className="recipe-card-rating">
            <StarRating rating={recipe.avgRating} readonly size="small" />
            <span className="rating-text">({recipe.reviewCount})</span>
          </div>
        )}
        <p className="recipe-card-description">
          {recipe.description || 'Simple instructions and familiar island flavours for any day of the week.'}
        </p>
        <div className="recipe-card-meta">
          <span>{prep}</span>
          <span>{difficulty}</span>
        </div>
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="recipe-card-tags">
            {recipe.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="tag-badge">{tag}</span>
            ))}
          </div>
        )}
        <Link to={`/recipes/${id}`} className="recipe-card-link-action">View full recipe</Link>
      </div>
    </article>
  );
};

export default RecipeCard;
