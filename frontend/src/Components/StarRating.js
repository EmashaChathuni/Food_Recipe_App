import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRate, readonly = false, size = 'medium' }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className={`star-rating ${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= (hover || rating) ? 'filled' : ''}`}
          onClick={() => !readonly && onRate && onRate(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          disabled={readonly}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
