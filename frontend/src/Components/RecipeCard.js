import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onToggleFavorite, isFavorite }) => {
  const id = recipe._id || recipe.id;
  const image = recipe.image || 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg';
  const category = recipe.category || 'Seasonal';
  const prep = recipe.prepTime || '30 mins';
  const difficulty = recipe.difficulty || 'Intermediate';

  return (
    <article className="recipe-card-tile">
      <Link to={`/recipes/${id}`} className="recipe-card-link" aria-label={`Open ${recipe.title || recipe.name}`}>
        <div className="recipe-card-media">
          <img src={image} alt={recipe.title || recipe.name} />
          <span className="recipe-card-category">{category}</span>
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
        <p className="recipe-card-description">
          {recipe.description || 'Simple instructions and familiar island flavours for any day of the week.'}
        </p>
        <div className="recipe-card-meta">
          <span>{prep}</span>
          <span>{difficulty}</span>
        </div>
        <Link to={`/recipes/${id}`} className="recipe-card-link-action">View full recipe</Link>
      </div>
    </article>
  );
};

export default RecipeCard;
