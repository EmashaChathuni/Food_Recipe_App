import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RECIPE_CATEGORIES, getMainCategories } from '../data/categories';
import './CategoryBrowser.css';

const CategoryBrowser = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCategories(getMainCategories());
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate(`/category/${categoryName}`, { state: { category: categoryName } });
  };

  if (loading) {
    return <div className="category-loading">Loading categories...</div>;
  }

  return (
    <div className="category-browser">
      <div className="category-header">
        <h1>Explore Our Recipe Collection</h1>
        <p>Browse through {categories.length} carefully curated recipe categories</p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.name}
            className="category-card"
            onClick={() => handleCategoryClick(category.name)}
            style={{ '--category-color': category.color }}
          >
            <div className="category-image-wrapper">
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=' + category.name;
                }}
              />
              <div className="category-overlay">
                <div className="category-icon">{category.icon}</div>
              </div>
            </div>
            
            <div className="category-content">
              <h3>{category.name}</h3>
              <p className="category-description">{category.description}</p>
              <button className="explore-btn">
                Explore {category.name} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBrowser;
