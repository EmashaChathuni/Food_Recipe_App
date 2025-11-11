import React, { useState, useEffect } from 'react';
import './RecipeDetails.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const local = (() => {
          try {
            return JSON.parse(localStorage.getItem('recipes_demo') || '[]');
          } catch {
            return [];
          }
        })();
        const foundLocal = local.find((r) => (r.id === id) || (r._id === id));
        if (foundLocal) {
          if (mounted) setRecipe(foundLocal);
          return;
        }
        const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${base}/recipes/${id}`);
        if (mounted) setRecipe(res.data?.data || res.data?.recipe || null);
      } catch (err) {
        console.error('Failed to load recipe', err);
        if (mounted) setRecipe(null);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (!recipe) return <div className="container py-8">Recipe not found</div>;

  return (
    <div className="container py-8">
      <div className="grid" style={{gridTemplateColumns: '1fr 320px', gap: '1rem'}}>
        <div>
          <img src={recipe.image || 'https://images.unsplash.com/photo-1608032360451-319c2c4f3e4b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3'} alt={recipe.title || recipe.name} style={{width: '100%', borderRadius: '8px'}} />
          <h2 className="mt-4 text-2xl font-bold">{recipe.title || recipe.name}</h2>
          <p className="text-sm text-gray-600 mt-2">{recipe.category || 'Sri Lankan dish'} • {recipe.prepTime || '30 mins'}</p>

          <section className="mt-6">
            <h3 className="font-bold">Ingredients</h3>
            <ul className="mt-2">
              {(recipe.ingredients || []).map((ing, i) => <li key={i} className="mt-1">• {ing}</li>)}
            </ul>
          </section>

          <section className="mt-6">
            <h3 className="font-bold">Steps</h3>
            <ol className="mt-2">
              {(recipe.steps || []).map((s, i) => <li key={i} className="mt-2">{i + 1}. {s}</li>)}
            </ol>
          </section>
        </div>

        <aside>
          <div className="card p-4">
            <h4 className="font-bold">Quick info</h4>
            <p className="mt-2">Prep: {recipe.prepTime || '30 mins'}</p>
            <p className="mt-1">Difficulty: {recipe.difficulty || 'Easy'}</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RecipeDetails;
