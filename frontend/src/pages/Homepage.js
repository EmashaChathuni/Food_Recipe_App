import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sampleRecipes from '../data/SampleRecipes';
import SubcategoryModal from '../Components/SubcategoryModal';
import './Homepage.css';

const HERO_IMAGES = [
  'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=1200&h=600&fit=crop',
  'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?w=1200&h=600&fit=crop',
  'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?w=1200&h=600&fit=crop',
  'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?w=1200&h=600&fit=crop'
];

const highlightStats = [
  { label: 'Authentic Recipes', value: '500+', icon: '' },
  { label: 'Home Cooks', value: '2.5K+', icon: '' },
  { label: 'Daily Visitors', value: '15K+', icon: '' },
  { label: 'Countries', value: '45+', icon: '' }
];

// Occasion-based food categories
const occasionCategories = [
  { 
    name: 'Birthday Party Finger Foods', 
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?w=500&h=400&fit=crop', 
    description: 'Easy-to-eat bites and appetizers perfect for celebrations',
    icon: '🎉'
  },
  { 
    name: 'Picnic Food Ideas', 
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=400&fit=crop', 
    description: 'Portable and delicious dishes for outdoor gatherings',
    icon: '🧺'
  },
  { 
    name: 'Tea Time Snacks', 
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?w=500&h=400&fit=crop', 
    description: 'Light treats and savory bites for afternoon tea',
    icon: '🫖'
  },
  { 
    name: 'Family Gatherings', 
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?w=500&h=400&fit=crop', 
    description: 'Traditional dishes to bring everyone together',
    icon: '👨‍👩‍👧‍👦'
  },
  { 
    name: 'Festive Feasts', 
    image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?w=500&h=400&fit=crop', 
    description: 'Celebratory meals for special occasions',
    icon: '🎊'
  },
  { 
    name: 'Quick Weeknight Dinners', 
    image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?w=500&h=400&fit=crop', 
    description: 'Easy recipes for busy families',
    icon: '⏰'
  }
];

const testimonials = [
  { name: 'Priya Fernando', location: 'Colombo', text: 'Best recipe app for authentic Sri Lankan food! The instructions are so clear.', rating: 5, image: '👩' },
  { name: 'Kasun Silva', location: 'Kandy', text: 'Finally found my grandma\'s kottu recipe here. Tastes just like home!', rating: 5, image: '👨' },
  { name: 'Amara Perera', location: 'Galle', text: 'Love the variety of recipes. Perfect for beginners and experts alike.', rating: 5, image: '👩' },
  { name: 'Ravi Jayasekera', location: 'Colombo', text: 'The picnic food ideas are amazing! Everyone asks for the recipes now.', rating: 5, image: '👨' },
  { name: 'Nisha Weerasooriya', location: 'Kandy', text: 'Perfect for my daughters birthday party! The finger foods were a hit.', rating: 5, image: '👩' },
  { name: 'Malik Hassan', location: 'Jaffna', text: 'Community feature is fantastic. Love sharing and learning from others.', rating: 5, image: '👨' }
];

const communityHighlights = [
  { title: 'Every Recipe Celebrates Tradition', description: 'From ancestral kitchens to modern tables, Island Table connects Sri Lankan families through food.', image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400&h=300&fit=crop' },
  { title: 'Occasion Ready Meals', description: 'Find the perfect recipe for birthdays, picnics, gatherings, and every special moment.', image: 'https://images.pexels.com/photos/1769306/pexels-photo-1769306.jpeg?w=400&h=300&fit=crop' },
  { title: 'Easy & Accessible', description: 'Step-by-step instructions that anyone can follow, whether you\'re a beginner or expert.', image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?w=400&h=300&fit=crop' },
  { title: 'Community Tested', description: 'Every recipe is tried and loved by thousands of home cooks in our community worldwide.', image: 'https://images.pexels.com/photos/2284100/pexels-photo-2284100.jpeg?w=400&h=300&fit=crop' }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState('');

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

  const handleOccasionClick = (occasionName) => {
    setSelectedOccasion(occasionName);
    setIsModalOpen(true);
  };

  return (
    <div className="homepage">
      {/* HERO SECTION */}
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
              <h1 className="hero-title">Island Table</h1>
              <p className="hero-subtitle">
                Discover many authentic recipes for every occasion 
              </p>

              <form className="hero-search" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search recipes for your occasion..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="hero-search-input"
                />
                <button type="submit" className="btn btn-primary">Search</button>
                <button type="button" onClick={handleRandomRecipe} className="btn btn-secondary">
                  🎲 Random Recipe
                </button>
              </form>

              <div className="hero-quick-links">
                <Link to="/recipes" className="quick-link">🍳 All Recipes</Link>
                <Link to="/recipes?category=Desserts" className="quick-link">🍰 Desserts</Link>
                <Link to="/recipes?category=Appetizers" className="quick-link">🥗 Appetizers</Link>
                <Link to="/recipes?category=Beverages" className="quick-link">☕ Beverages</Link>
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

      {/* STATS SECTION */}
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

      {/* ABOUT US SECTION */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <span className="about-badge">About Us</span>
              <h2 className="about-title">Welcome to Island Table</h2>
              <p className="about-description">
                Island Table is dedicated to preserving and celebrating authentic Sri Lankan cuisine. 
                Our platform brings together generations of culinary traditions, modern cooking techniques, 
                and a vibrant community of home cooks passionate about sharing their heritage.
              </p>
              
              <div className="about-features">
                <div className="about-feature">
                  <span className="feature-icon">🥘</span>
                  <div className="feature-content">
                    <h4>Authentic Recipes</h4>
                    <p>Traditional dishes passed down through generations</p>
                  </div>
                </div>
                
                <div className="about-feature">
                  <span className="feature-icon">👥</span>
                  <div className="feature-content">
                    <h4>Community-Driven</h4>
                    <p>Share recipes and learn from experienced cooks</p>
                  </div>
                </div>
                
                <div className="about-feature">
                  <span className="feature-icon">🎉</span>
                  <div className="feature-content">
                    <h4>Occasion Ready</h4>
                    <p>Find perfect recipes for any celebration</p>
                  </div>
                </div>
                
                <div className="about-feature">
                  <span className="feature-icon">🌟</span>
                  <div className="feature-content">
                    <h4>Quality Tested</h4>
                    <p>Every recipe loved by our community</p>
                  </div>
                </div>
              </div>

              <div className="about-cta">
                <p className="about-highlight">Start cooking authentic Sri Lankan food today!</p>
                <Link to="/recipes" className="btn btn-primary">Browse All Recipes</Link>
              </div>
            </div>
            
            <div className="about-image">
              <div className="about-image-container" style={{ 
                backgroundImage: 'url(https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?w=600&h=500&fit=crop)' 
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* OCCASION CATEGORIES SECTION */}
      <section className="container section occasions-section">
        <div className="section-header">
          <h2 className="section-title">Perfect Recipes for Every Occasion</h2>
          <p className="section-description">Whether it's a birthday party, picnic, tea time gathering, or family feast - find the ideal recipes for your special moments</p>
        </div>

        <div className="occasions-grid">
          {occasionCategories.map((occasion) => (
            <button
              key={occasion.name}
              onClick={() => handleOccasionClick(occasion.name)}
              className="occasion-card"
              aria-label={`Browse ${occasion.name}`}
            >
              <div className="occasion-image" style={{ backgroundImage: `url(${occasion.image})` }}>
                <div className="occasion-overlay" />
              </div>
              <div className="occasion-content">
                <span className="occasion-icon">{occasion.icon}</span>
                <h3 className="occasion-name">{occasion.name}</h3>
                <p className="occasion-description">{occasion.description}</p>
                <span className="occasion-cta">Explore Recipes →</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* COMMUNITY HIGHLIGHTS */}
      <section className="community-highlights-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Island Table</h2>
            <p className="section-description">Join a passionate community of home cooks celebrating authentic Sri Lankan cuisine</p>
          </div>

          <div className="highlights-grid">
            {communityHighlights.map((highlight, index) => (
              <div key={index} className="highlight-card">
                <div className="highlight-image" style={{ backgroundImage: `url(${highlight.image})` }}>
                  <div className="highlight-overlay" />
                </div>
                <div className="highlight-content">
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPANDED TESTIMONIALS SECTION */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Community Loves Island Table</h2>
            <p className="section-description">Real reviews from home cooks sharing their culinary journeys</p>
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

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Culinary Journey?</h2>
            <p className="cta-description">
              Join thousands of home cooks exploring authentic Sri Lankan cuisine. 
              Find recipes for every occasion and share your family traditions.
            </p>
            <div className="cta-actions">
              <Link to="/recipes" className="btn btn-primary btn-lg">🍳 Browse Recipes</Link>
              <Link to="/add-recipe" className="btn btn-outline btn-lg">✏️ Share Your Recipe</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SUBCATEGORY MODAL */}
      <SubcategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        occasionName={selectedOccasion}
        recipes={recipes}
      />
    </div>
  );
};

export default HomePage;
