import React from 'react';
import './RecipeCardSkeleton.css';

const RecipeCardSkeleton = () => {
  return (
    <article className="recipe-card-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-body">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
        <div className="skeleton-meta">
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
        </div>
      </div>
    </article>
  );
};

export default RecipeCardSkeleton;
