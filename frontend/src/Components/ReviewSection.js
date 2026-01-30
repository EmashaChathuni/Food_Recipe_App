import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import StarRating from './StarRating';
import './ReviewSection.css';

const ReviewSection = ({ recipeId, reviews, avgRating, onReviewSubmit }) => {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return;

    setSubmitting(true);
    try {
      const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${base}/recipes/${recipeId}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment('');
      setRating(5);
      if (onReviewSubmit) onReviewSubmit(response.data.reviews);
    } catch (err) {
      console.error('Failed to submit review', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="review-section">
      <div className="review-header">
        <h3>Reviews</h3>
        {avgRating > 0 && (
          <div className="rating-summary">
            <StarRating rating={avgRating} readonly size="small" />
            <span className="rating-text">{avgRating} ({reviews?.length || 0})</span>
          </div>
        )}
      </div>

      {isAuthenticated && (
        <form className="review-form" onSubmit={handleSubmit}>
          <h4>Share your experience</h4>
          <StarRating rating={rating} onRate={setRating} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell others what you think about this recipe..."
            rows="4"
          />
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      <div className="reviews-list">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header-item">
                <strong>{review.userName}</strong>
                <StarRating rating={review.rating} readonly size="small" />
              </div>
              {review.comment && <p>{review.comment}</p>}
              <span className="review-date">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
