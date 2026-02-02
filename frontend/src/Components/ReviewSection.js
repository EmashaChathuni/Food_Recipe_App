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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return;

    setError('');
    setSuccess('');
    setSubmitting(true);
    
    try {
      const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to submit a review');
        setSubmitting(false);
        return;
      }
      
      const response = await axios.post(
        `${base}/recipes/${recipeId}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setComment('');
      setRating(5);
      setSuccess('Review submitted successfully!');
      
      if (onReviewSubmit) onReviewSubmit(response.data.reviews);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to submit review', err);
      const errorMsg = err.response?.data?.message || 'Failed to submit review. Please try again.';
      setError(errorMsg);
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

      {isAuthenticated ? (
        <form className="review-form" onSubmit={handleSubmit}>
          <h4>Share your experience</h4>
          {error && <div className="error-message" style={{ color: '#d32f2f', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffebee', borderRadius: '4px' }}>{error}</div>}
          {success && <div className="success-message" style={{ color: '#2e7d32', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>{success}</div>}
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
      ) : (
        <div className="login-prompt" style={{ 
          padding: '1.5rem', 
          backgroundColor: '#f4eee4', 
          borderRadius: '8px', 
          textAlign: 'center',
          marginBottom: '2rem' 
        }}>
          <p style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Want to share your experience?</p>
          <p style={{ marginBottom: '1rem', color: '#666' }}>Please log in to leave a review and rating.</p>
          <a href="/login" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f06a2d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: '500'
          }}>
            Log In to Review
          </a>
        </div>
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
