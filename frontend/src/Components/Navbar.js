import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="site-navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <div className="brand-emblem">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12H15C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12H7Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <span className="brand-name">Island Table</span>
            <span className="brand-tagline">Sri Lankan recipes made easy</span>
          </div>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/recipes" className="nav-item">🍳 All Dishes</Link>
          <Link to="/favorites" className="nav-item">💕 My Favourites</Link>
          <Link to="/add-recipe" className="nav-item">➕ Share a Recipe</Link>
        </nav>

        <div className="nav-actions">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn nav-btn nav-btn--ghost">Log in</Link>
              <Link to="/signup" className="btn nav-btn nav-btn--accent">Join Island Table</Link>
            </>
          ) : (
            <div className="nav-user">
              <div className="nav-avatar" aria-hidden="true">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="nav-username">{user?.name || 'Guest'}</span>
              <button type="button" className="btn nav-btn nav-btn--ghost" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
