import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubcategoryModal.css';
import sampleRecipes from '../data/SampleRecipes';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

const SubcategoryModal = ({ isOpen, onClose, occasionName, recipes }) => {
  const navigate = useNavigate();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Filter recipes by the selected occasion
  const filteredRecipes = useMemo(() => {
    return (recipes || sampleRecipes).filter(recipe => {
      if (!recipe.occasions) return false;
      return recipe.occasions.includes(occasionName);
    });
  }, [occasionName, recipes]);

  // Get unique subcategories from filtered recipes
  const subcategories = useMemo(() => {
    const subCats = [...new Set(filteredRecipes.map(r => r.subcategory).filter(Boolean))];
    return subCats.sort();
  }, [filteredRecipes]);

  // Get recipes for selected subcategory
  const recipesInSubcategory = useMemo(() => {
    if (!selectedSubcategory) return [];
    return filteredRecipes.filter(r => r.subcategory === selectedSubcategory);
  }, [selectedSubcategory, filteredRecipes]);

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>

        <div className="modal-header">
          <h2 className="modal-title">{occasionName}</h2>
          <p className="modal-subtitle">Select a category to see recipes</p>
        </div>

        <div className="modal-body">
          {!selectedSubcategory ? (
            // Show subcategories
            <div className="subcategories-grid">
              {subcategories.length > 0 ? (
                subcategories.map((subcategory) => {
                  const count = filteredRecipes.filter(r => r.subcategory === subcategory).length;
                  return (
                    <button
                      key={subcategory}
                      className="subcategory-card"
                      onClick={() => setSelectedSubcategory(subcategory)}
                    >
                      <div className="subcategory-content">
                        <h3 className="subcategory-name">{subcategory}</h3>
                        <p className="subcategory-count">{count} recipe{count !== 1 ? 's' : ''}</p>
                      </div>
                      <span className="subcategory-arrow">→</span>
                    </button>
                  );
                })
              ) : (
                <p className="no-results">No recipes found for this occasion</p>
              )}
            </div>
          ) : (
            // Show recipes in selected subcategory
            <div>
              <button
                className="back-button"
                onClick={() => setSelectedSubcategory(null)}
              >
                ← Back to Categories
              </button>
              <div className="recipes-grid">
                {recipesInSubcategory.map((recipe) => (
                  <div
                    key={recipe.id || recipe._id}
                    className="recipe-item"
                    onClick={() => handleRecipeClick(recipe.id || recipe._id)}
                  >
                    <div className="recipe-item-image">
                      <img src={getImageUrl(recipe)} alt={recipe.title} onError={(e) => handleImageError(e, recipe)} />
                    </div>
                    <div className="recipe-item-info">
                      <h4 className="recipe-item-title">{recipe.title}</h4>
                      <p className="recipe-item-meta">
                        <span>⏱️ {recipe.prepTime}</span>
                        <span>📊 {recipe.difficulty}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryModal;
