import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { RECIPE_CATEGORIES, getSubcategories } from '../data/categories';
import './CategoryDetail.css';

const CategoryDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [categoryData, setCategoryData] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const decodedCategory = decodeURIComponent(category);
    if (RECIPE_CATEGORIES[decodedCategory]) {
      setCategoryData({
        name: decodedCategory,
        ...RECIPE_CATEGORIES[decodedCategory]
      });
    } else {
      navigate('/categories');
    }
  }, [category, navigate]);

  const handleSubcategoryClick = (subcategoryName) => {
    setSelectedSubcategory(subcategoryName);
    fetchRecipesBySubcategory(subcategoryName);
  };

  const fetchRecipesBySubcategory = async (subcategoryName) => {
    setLoading(true);
    try {
      const decodedCategory = decodeURIComponent(category);
      const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
      const response = await fetch(
        `${base}/recipes?category=${decodedCategory}&subcategory=${subcategoryName}`
      );
      const data = await response.json();
      setRecipes(Array.isArray(data) ? data : data.recipes || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  if (!categoryData) {
    return <div className="category-loading">Loading...</div>;
  }

  const subcategories = getSubcategories(categoryData.name);

  return (
    <div className="category-detail">
      {/* Header with Main Category */}
      <div className="category-header-section">
        <button className="back-button" onClick={() => navigate('/categories')}>
          ← Back to Categories
        </button>
        
        <div className="header-content">
          <div className="header-image">
            <img
              src={categoryData.image}
              alt={categoryData.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x400?text=' + categoryData.name;
              }}
            />
            <div className="header-overlay"></div>
            <div className="header-text">
              <span className="category-icon-large">{categoryData.icon}</span>
              <h1>{categoryData.name}</h1>
              <p>{categoryData.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategories Section */}
      <div className="subcategories-section">
        <div className="container">
          <h2 className="section-title">Choose a Subcategory</h2>
          <div className="subcategories-grid">
            {subcategories.map((subcategory, index) => (
              <div
                key={index}
                className={`subcategory-card ${
                  selectedSubcategory === subcategory.name ? 'active' : ''
                }`}
                onClick={() => handleSubcategoryClick(subcategory.name)}
                style={{ '--delay': `${index * 100}ms` }}
              >
                <div className="subcategory-image-wrapper">
                  <img
                    src={subcategory.image}
                    alt={subcategory.name}
                    className="subcategory-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=' + subcategory.name;
                    }}
                  />
                  <div className="subcategory-overlay">
                    <span className="select-text">Select</span>
                  </div>
                </div>
                <div className="subcategory-info">
                  <h3>{subcategory.name}</h3>
                  <p>{subcategory.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recipes Section */}
      {selectedSubcategory && (
        <div className="recipes-section">
          <div className="container">
            <div className="recipes-header">
              <h2>Recipes in {categoryData.name} → {selectedSubcategory}</h2>
              <p>Discover delicious recipes from this subcategory</p>
            </div>

            {loading ? (
              <div className="recipes-loading">Loading recipes...</div>
            ) : recipes.length > 0 ? (
              <div className="recipes-grid">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="recipe-preview-card">
                    <div className="recipe-image">
                      <img
                        src={recipe.image}
                        alt={recipe.title || recipe.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/250x200?text=Recipe';
                        }}
                      />
                      <div className="recipe-badge">
                        {recipe.cookingTime || recipe.prepTime || '30 min'}
                      </div>
                    </div>
                    <div className="recipe-info">
                      <h4>{recipe.title || recipe.name}</h4>
                      <p className="recipe-description">
                        {(recipe.description || '').substring(0, 100)}...
                      </p>
                      <button
                        className="view-recipe-btn"
                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                      >
                        View Recipe →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-recipes">
                <p>No recipes found in this subcategory yet.</p>
                <button onClick={() => navigate('/add-recipe')} className="add-recipe-btn">
                  Be the first to add a recipe! 🍽️
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
