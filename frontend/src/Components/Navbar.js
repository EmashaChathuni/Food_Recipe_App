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
          <div className="brand-emblem">�</div>
          <div>
            <span className="brand-name">Island Table</span>
            <span className="brand-tagline">Sri Lankan recipes made easy</span>
          </div>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/recipes" className="nav-item">All Dishes</Link>
          <Link to="/favorites" className="nav-item">My Favourites</Link>
          <Link to="/add-recipe" className="nav-item">Share a Recipe</Link>
          {isAuthenticated && <Link to="/dashboard" className="nav-item">Dashboard</Link>}
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
