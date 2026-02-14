import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sampleRecipes from '../data/SampleRecipes';
import './Homepage.css';

const HERO_IMAGES = [
  'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/0/0d/Srilankan_fish_curry.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/0/07/Lunumiris_with_Appam.JPG'
];

const highlightStats = [
  { label: 'Authentic Recipes', value: '500+', icon: '' },
  { label: 'Home Cooks', value: '2.5K+', icon: '' },
  { label: 'Daily Visitors', value: '15K+', icon: '' },
  { label: 'Countries', value: '45+', icon: '' }
];

const categories = [
  { name: 'Breakfast', image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Lunumiris_with_Appam.JPG', count: '45+', icon: '' },
  { name: 'Curry', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg', count: '120+', icon: '' },
  { name: 'Seafood', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Srilankan_fish_curry.JPG', count: '65+', icon: '' },
  { name: 'Dessert', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Watalappan_%2823091763250%29.jpg', count: '80+', icon: '' },
  { name: 'Snacks', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg', count: '95+', icon: '' },
  { name: 'Beverages', image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Kiribath_%28milk_rice%29.jpg', count: '40+', icon: '' }
];

const featuredRecipes = [
  {
    title: 'Traditional Kottu Roti',
    description: 'Crispy roti strips tossed with vegetables, eggs and aromatic spices',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg',
    time: '25 mins',
    difficulty: 'Medium',
    rating: 4.8,
    reviews: 342
  },
  {
    title: 'Authentic Fish Ambul Thiyal',
    description: 'Sour fish curry with goraka, a coastal delicacy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Srilankan_fish_curry.JPG',
    time: '45 mins',
    difficulty: 'Medium',
    rating: 4.9,
    reviews: 287
  },
  {
    title: 'Creamy Watalappan',
    description: 'Traditional coconut custard pudding with jaggery and spices',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Watalappan_%2823091763250%29.jpg',
    time: '60 mins',
    difficulty: 'Easy',
    rating: 4.7,
    reviews: 198
  }
];

const whyChooseUs = [
  { icon: '✓', title: 'Authentic Recipes', description: 'Traditional Sri Lankan recipes passed down through generations' },
  { icon: '', title: 'Expert Guidance', description: 'Step-by-step instructions with professional cooking tips' },
  { icon: '', title: 'Fresh Ingredients', description: 'Using locally sourced, organic ingredients for best taste' },
  { icon: '', title: 'Community Tested', description: 'Every recipe reviewed and rated by our cooking community' }
];

const testimonials = [
  { name: 'Priya Fernando', location: 'Colombo', text: 'Best recipe app for authentic Sri Lankan food! The instructions are so clear.', rating: 5, image: '' },
  { name: 'Kasun Silva', location: 'Kandy', text: 'Finally found my grandma\'s kottu recipe here. Tastes just like home!', rating: 5, image: '' },
  { name: 'Amara Perera', location: 'Galle', text: 'Love the variety of recipes. Perfect for beginners and experts alike.', rating: 5, image: '' }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
        const response = await fetch(`${base}/recipes`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setRecipes(data);
        } else if (data && Array.isArray(data.recipes)) {
          setRecipes(data.recipes);
        }
      } catch (error) {
        console.info('Falling back to sample recipes', error);
        setRecipes(sampleRecipes);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
        const response = await fetch(`${base}/recipes/trending/top?limit=6`);
        const data = await response.json();
        setTrendingRecipes(data);
      } catch (error) {
        setTrendingRecipes(recipes.slice(0, 6));
      }
    };

    fetchTrending();
  }, [recipes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleRandomRecipe = async () => {
    try {
      const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
      const response = await fetch(`${base}/recipes/random/one`);
      const data = await response.json();
      if (data && (data._id || data.id)) {
        navigate(`/recipes/${data._id || data.id}`);
      }
    } catch (error) {
      const random = recipes[Math.floor(Math.random() * recipes.length)];
      if (random) {
        navigate(`/recipes/${random._id || random.id}`);
      }
    }
  };

  const heroHighlights = useMemo(() => recipes.slice(0, 3), [recipes]);
  const recentRecipes = useMemo(() => recipes.slice(0, 8), [recipes]);

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-background">
          {HERO_IMAGES.map((img, index) => (
            <div
              key={img}
              className={`hero-slide ${index === currentHeroImage ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="hero-overlay" />
        </div>

        <div className="hero-content-wrapper">
          <div className="container">
            <div className="hero-content">
              <span className="hero-badge">Authentic Sri Lankan Cuisine</span>
              <h1 className="hero-title">Discover Traditional Foods</h1>
              <p className="hero-subtitle">
                Explore 500+ authentic Sri Lankan recipes from breakfast hoppers to festive lamprais. 
                Cook with confidence using our step-by-step guides and expert tips.
              </p>

              <form className="hero-search" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search for recipes, ingredients, or dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="hero-search-input"
                />
                <button type="submit" className="btn btn-primary">Search</button>
                <button type="button" onClick={handleRandomRecipe} className="btn btn-secondary">
                  Random Recipe
                </button>
              </form>

              <div className="hero-quick-links">
                <Link to="/recipes?category=Breakfast" className="quick-link">Breakfast</Link>
                <Link to="/recipes?category=Curry" className="quick-link">Curries</Link>
                <Link to="/recipes?category=Dessert" className="quick-link">Desserts</Link>
                <Link to="/recipes?category=Snacks" className="quick-link">Snacks</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-slider-dots">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentHeroImage ? 'active' : ''}`}
              onClick={() => setCurrentHeroImage(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {highlightStats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section categories-section">
        <div className="section-header">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-description">Explore our collection of authentic Sri Lankan dishes organized by meal type</p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/recipes?category=${cat.name}`}
              className="category-card"
            >
              <div className="category-image" style={{ backgroundImage: `url(${cat.image})` }}>
                <div className="category-overlay" />
              </div>
              <div className="category-content">
                <span className="category-icon">{cat.icon}</span>
                <h3 className="category-name">{cat.name}</h3>
                <span className="category-count">{cat.count} recipes</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Recipes</h2>
            <p className="section-description">Hand-picked recipes that showcase the best of Sri Lankan cuisine</p>
          </div>

          <div className="featured-grid">
            {featuredRecipes.map((recipe, index) => (
              <div key={index} className="featured-card">
                <div className="featured-image" style={{ backgroundImage: `url(${recipe.image})` }}>
                  <span className="featured-badge">Featured</span>
                </div>
                <div className="featured-content">
                  <h3 className="featured-title">{recipe.title}</h3>
                  <p className="featured-description">{recipe.description}</p>
                  <div className="featured-meta">
                    <span>{recipe.time}</span>
                    <span>{recipe.difficulty}</span>
                    <span>{recipe.rating} ({recipe.reviews})</span>
                  </div>
                  <Link to="/recipes" className="btn btn-outline">View Recipe</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section trending-section">
        <div className="section-header">
          <h2 className="section-title">Trending Now</h2>
          <p className="section-description">Most popular recipes this week from our community</p>
          <Link to="/recipes" className="section-link">View all →</Link>
        </div>

        <div className="trending-grid">
          {(trendingRecipes.length > 0 ? trendingRecipes : recipes.slice(0, 6)).map((recipe) => (
            <Link
              key={recipe._id || recipe.id}
              to={`/recipes/${recipe._id || recipe.id}`}
              className="trending-card"
            >
              <div className="trending-image" style={{ backgroundImage: `url(${recipe.image || 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg'})` }}>
                <div className="trending-badge">Trending</div>
              </div>
              <div className="trending-content">
                <span className="trending-category">{recipe.category}</span>
                <h3 className="trending-title">{recipe.title || recipe.name}</h3>
                <div className="trending-meta">
                  <span>{recipe.prepTime}</span>
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Island Table</h2>
            <p className="section-description">Your trusted source for authentic Sri Lankan recipes</p>
          </div>

          <div className="why-choose-grid">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="why-card">
                <span className="why-icon">{item.icon}</span>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section recent-section">
        <div className="section-header">
          <h2 className="section-title">Recently Added</h2>
          <p className="section-description">Fresh recipes added by our community</p>
          <Link to="/recipes" className="section-link">See more →</Link>
        </div>

        <div className="recent-grid">
          {recentRecipes.map((recipe) => (
            <Link
              key={recipe._id || recipe.id}
              to={`/recipes/${recipe._id || recipe.id}`}
              className="recent-card"
            >
              <div className="recent-image" style={{ backgroundImage: `url(${recipe.image || 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg'})` }} />
              <div className="recent-content">
                <span className="recent-category">{recipe.category}</span>
                <h4 className="recent-title">{recipe.title || recipe.name}</h4>
                <p className="recent-description">{(recipe.description || '').substring(0, 80)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Community Says</h2>
            <p className="section-description">Real reviews from real home cooks</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <span className="testimonial-avatar">{testimonial.image}</span>
                  <div>
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-location">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Cooking?</h2>
            <p className="cta-description">
              Join thousands of home cooks exploring authentic Sri Lankan cuisine. 
              Share your family recipes and discover new favorites.
            </p>
            <div className="cta-actions">
              <Link to="/recipes" className="btn btn-primary btn-lg">Explore Recipes</Link>
              <Link to="/add-recipe" className="btn btn-outline btn-lg">Share Your Recipe</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-content">
              <h3 className="newsletter-title">Get Weekly Recipe Ideas</h3>
              <p className="newsletter-description">
                Subscribe to receive new recipes, cooking tips, and Sri Lankan food stories
              </p>
            </div>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
