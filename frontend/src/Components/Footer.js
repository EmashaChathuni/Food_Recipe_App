import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-emblem">�</div>
          <div>
            <h3>Island Table</h3>
            <p>Everyday Sri Lankan food stories, told through trusted family recipes and fresh island flavours.</p>
          </div>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/recipes">All Dishes</Link>
          <Link to="/favorites">My Favourites</Link>
          <Link to="/add-recipe">Share Your Dish</Link>
        </div>

        <div className="footer-links">
          <h4>Need Help?</h4>
          <button type="button" className="footer-link">Support</button>
          <button type="button" className="footer-link">Privacy &amp; Terms</button>
          <button type="button" className="footer-link">Media Kit</button>
        </div>

        <div className="footer-newsletter">
          <h4>Get Island Notes</h4>
          <p>Simple tips, fresh market finds, and new recipes every week.</p>
          <form className="footer-form" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
            <input id="newsletter-email" type="email" placeholder="you@example.com" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="container footer-bottom">
  <span>© {year} Island Table. Made in Sri Lanka for every kitchen.</span>
        <div className="footer-socials">
          <button type="button" aria-label="Instagram">Instagram</button>
          <button type="button" aria-label="Pinterest">Pinterest</button>
          <button type="button" aria-label="YouTube">YouTube</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;