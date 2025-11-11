import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Configure axios defaults (prefer REACT_APP_BACKEND_URL then REACT_APP_API_URL)
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Add a request interceptor to include the token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.post('/auth/verify-token', { token });
          if (response.data.success) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/login', { email, password });
      
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
        setIsAuthenticated(true);
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/signup', {
        name,
        email,
        password,
        confirmPassword
      });
      
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
        setIsAuthenticated(true);
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed. Please try again.';
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
