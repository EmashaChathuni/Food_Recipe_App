import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import RecipeDetails from './pages/RecipeDetails';
import CreateRecipe from './pages/CreateRecipe';
import Favorites from './pages/Favorites';
import Recipes from './pages/Recipes';
import AddRecipe from './pages/AddRecipe';
import Navbar from './Components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
  <Route path="/" element={<Homepage />} />
  <Route path="/recipes" element={<Recipes />} />
  <Route path="/recipes/:id" element={<RecipeDetails />} />
  <Route path="/add-recipe" element={<AddRecipe />} />
  <Route path="/create" element={<AddRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
