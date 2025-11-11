import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import sampleRecipes from '../data/SampleRecipes';
import './Homepage.css';

const HERO_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg';

const highlightStats = [
  { label: 'Trusted home cooks', value: '520+' },
  { label: 'Island recipes', value: '180' },
  { label: 'Weekly tastings', value: '12' },
];

const diningExperiences = [
  {
    title: 'Colombo Street Nights',
    copy: 'Hot plates of kottu, hoppers, and iced milo shared under bright lights.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Chicken_Kottu.jpg',
  },
  {
    title: 'Hill Country Breakfast',
    copy: 'Steaming milk rice, pol sambol, and fresh tea from the central hills.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Kiribath_%28milk_rice%29.jpg',
  },
  {
    title: 'Coastal Family Lunch',
    copy: 'Sour fish curry, tempered greens, and coconut roti on a sunset table.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Srilankan_fish_curry.JPG',
  },
];

const ctaCards = [
  {
    title: 'Teach your family favourite',
    description: 'Show us the dish you make for New Year, Poya, or rainy evenings.',
    action: 'Share recipe',
  },
  {
    title: 'Cook along this weekend',
    description: 'Pick a menu, gather fresh produce, and cook together with easy steps.',
    action: 'Plan cooking',
  },
];

const HomePage = () => {
  const [recipes, setRecipes] = useState(sampleRecipes);

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

  const heroHighlights = useMemo(() => recipes.slice(0, 3), [recipes]);
  const tastingNotes = useMemo(() => recipes.slice(0, 6), [recipes]);

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-media">
          <img src={HERO_IMAGE} alt="Sri Lankan family sharing a meal" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <span className="badge">Fresh from our island kitchens</span>
          <h1 className="display">Cook Sri Lankan favourites with ease</h1>
          <p>
            Island Table gathers homely recipes, bold spices, and step-by-step guides so every cook can serve the flavours of Sri Lanka with confidence.
          </p>

          <div className="hero-actions">
            <Link to="/recipes" className="btn btn-primary">Browse recipes</Link>
            <Link to="/add-recipe" className="btn btn-ghost">Add your recipe</Link>
          </div>

          <div className="hero-stats">
            {highlightStats.map((item) => (
              <div key={item.label}>
                <span className="hero-stat-value">{item.value}</span>
                <span className="hero-stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section highlights">
        <div className="section-heading">
          <h2>Island food moments</h2>
          <p>Simple guides to help you recreate the flavours we love, from street snacks to festive spreads.</p>
        </div>

        <div className="highlight-grid">
          {diningExperiences.map((experience) => (
            <article key={experience.title} className="highlight-card">
              <div className="highlight-image" style={{ backgroundImage: `url(${experience.image})` }} aria-hidden="true" />
              <div className="highlight-body">
                <h3>{experience.title}</h3>
                <p>{experience.copy}</p>
                <Link to="/recipes" className="link">Cook this set</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="chef-spotlight">
        <div className="container">
          <div className="spotlight-card">
            <div>
              <span className="badge badge-light">Seasonal spotlight</span>
              <h2 className="playfair">Weekend table by the coast</h2>
              <p>
                Try a full menu featuring ambul thiyal, tempered greens, and king coconut cooler. Follow the steps, swap ingredients you have, and serve it with pride.
              </p>
              <div className="spotlight-actions">
                <Link to="/recipes" className="btn btn-primary">See the menu</Link>
                <Link to="/favorites" className="btn btn-ghost">Save for later</Link>
              </div>
            </div>
            <div className="spotlight-gallery">
              {heroHighlights.map((item) => (
                <figure key={item._id || item.id}>
                  <img src={item.image || 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg'} alt={item.title || item.name} />
                  <figcaption>{item.title || item.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container section tasting-menu">
        <div className="section-heading">
          <h2>This week on Island Table</h2>
          <p>Browse reader favourites. Each recipe uses everyday ingredients and short, clear directions.</p>
        </div>

        <div className="tasting-grid">
          {tastingNotes.map((recipe) => (
            <article key={recipe._id || recipe.id} className="tasting-card">
              <div className="tasting-media" style={{ backgroundImage: `url(${recipe.image || 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sri_Lankan_Rice_and_Curry.jpg'})` }} />
              <div className="tasting-body">
                <span className="pill">{recipe.category || 'Seasonal'}</span>
                <h3>{recipe.title || recipe.name}</h3>
                <p>{recipe.description || 'Wholesome island food, made with fresh produce and pantry spices.'}</p>
                <div className="tasting-meta">
                  <span>{recipe.prepTime || '30 mins'}</span>
                  <span>{recipe.difficulty || 'Intermediate'}</span>
                </div>
                <Link to={`/recipes/${recipe._id || recipe.id}`} className="link">Cook now</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-grid">
          {ctaCards.map((card) => (
            <article key={card.title} className="cta-card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button type="button" className="btn btn-primary">{card.action}</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
