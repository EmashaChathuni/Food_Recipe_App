import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-emblem">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12H15C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12H7Z" fill="currentColor"/>
            </svg>
          </div>
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