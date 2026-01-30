const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Initialize SQLite database
const db = new sqlite3.Database('./recipes.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

// Create tables if they don't exist
function initDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        title TEXT,
        category TEXT,
        prepTime TEXT,
        difficulty TEXT,
        image TEXT,
        description TEXT,
        ingredients TEXT,
        steps TEXT,
        tags TEXT,
        servings INTEGER DEFAULT 4,
        author_id INTEGER,
        views INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        recipe_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        UNIQUE(user_id, recipe_id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(user_id, recipe_id)
      )
    `);

    console.log('Database tables initialized');
  });
}

// Helper function to generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

// Auth middleware
async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Invalid token format' });
  
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    
    db.get('SELECT id, name, email FROM users WHERE id = ?', [payload.id], (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Invalid token user' });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
}

// ===== RECIPE ROUTES =====

// Get all recipes (with optional category filter)
app.get('/api/recipes', (req, res) => {
  const { category, tag, search } = req.query;
  
  let query = `
    SELECT r.*, 
           COALESCE(AVG(rv.rating), 0) as avgRating,
           COUNT(DISTINCT rv.id) as reviewCount,
           u.name as authorName
    FROM recipes r
    LEFT JOIN reviews rv ON r.id = rv.recipe_id
    LEFT JOIN users u ON r.author_id = u.id
  `;
  let conditions = [];
  let params = [];
  
  if (category && category !== 'All') {
    conditions.push('r.category = ?');
    params.push(category);
  }
  
  if (tag) {
    conditions.push('r.tags LIKE ?');
    params.push(`%${tag}%`);
  }
  
  if (search) {
    conditions.push('(r.name LIKE ? OR r.description LIKE ? OR r.ingredients LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  
  query += ' GROUP BY r.id ORDER BY r.created_at DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    
    const recipes = rows.map(row => ({
      ...row,
      _id: row.id,
      ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
      steps: row.steps ? JSON.parse(row.steps) : [],
      tags: row.tags ? JSON.parse(row.tags) : [],
      avgRating: Math.round(row.avgRating * 10) / 10,
      reviewCount: row.reviewCount
    }));
    
    res.json(recipes);
  });
});

// Get single recipe by ID
app.get('/api/recipes/:id', (req, res) => {
  db.run('UPDATE recipes SET views = views + 1 WHERE id = ?', [req.params.id]);
  
  const query = `
    SELECT r.*, 
           COALESCE(AVG(rv.rating), 0) as avgRating,
           COUNT(DISTINCT rv.id) as reviewCount,
           u.name as authorName
    FROM recipes r
    LEFT JOIN reviews rv ON r.id = rv.recipe_id
    LEFT JOIN users u ON r.author_id = u.id
    WHERE r.id = ?
    GROUP BY r.id
  `;
  
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    const recipe = {
      ...row,
      _id: row.id,
      ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
      steps: row.steps ? JSON.parse(row.steps) : [],
      tags: row.tags ? JSON.parse(row.tags) : [],
      avgRating: Math.round(row.avgRating * 10) / 10,
      reviewCount: row.reviewCount
    };
    
    db.all(
      `SELECT rv.*, u.name as userName 
       FROM reviews rv 
       JOIN users u ON rv.user_id = u.id 
       WHERE rv.recipe_id = ? 
       ORDER BY rv.created_at DESC`,
      [req.params.id],
      (err, reviews) => {
        recipe.reviews = reviews || [];
        res.json(recipe);
      }
    );
  });
});

// Create new recipe
app.post('/api/recipes', (req, res) => {
  const { name, title, category, prepTime, difficulty, image, description, ingredients, steps, tags, servings } = req.body;
  
  const query = `
    INSERT INTO recipes (name, title, category, prepTime, difficulty, image, description, ingredients, steps, tags, servings)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const params = [
    name || title,
    title || name,
    category,
    prepTime,
    difficulty,
    image,
    description,
    JSON.stringify(ingredients || []),
    JSON.stringify(steps || []),
    JSON.stringify(tags || []),
    servings || 4
  ];
  
  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to create recipe', error: err.message });
    }
    
    db.get('SELECT * FROM recipes WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Recipe created but failed to retrieve', error: err.message });
      }
      
      const recipe = {
        ...row,
        _id: row.id,
        ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
        steps: row.steps ? JSON.parse(row.steps) : [],
        tags: row.tags ? JSON.parse(row.tags) : []
      };
      
      res.status(201).json(recipe);
    });
  });
});

app.get('/api/recipes/trending/top', (req, res) => {
  const limit = req.query.limit || 6;
  const query = `
    SELECT r.*, 
           COALESCE(AVG(rv.rating), 0) as avgRating,
           COUNT(DISTINCT rv.id) as reviewCount,
           u.name as authorName
    FROM recipes r
    LEFT JOIN reviews rv ON r.id = rv.recipe_id
    LEFT JOIN users u ON r.author_id = u.id
    GROUP BY r.id
    ORDER BY r.views DESC, avgRating DESC
    LIMIT ?
  `;
  
  db.all(query, [limit], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    const recipes = rows.map(row => ({
      ...row,
      _id: row.id,
      ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
      steps: row.steps ? JSON.parse(row.steps) : [],
      tags: row.tags ? JSON.parse(row.tags) : [],
      avgRating: Math.round(row.avgRating * 10) / 10
    }));
    
    res.json(recipes);
  });
});

app.get('/api/recipes/random/one', (req, res) => {
  db.get('SELECT * FROM recipes ORDER BY RANDOM() LIMIT 1', (err, row) => {
    if (err || !row) {
      return res.status(500).json({ message: 'Failed to get random recipe' });
    }
    
    const recipe = {
      ...row,
      _id: row.id,
      ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
      steps: row.steps ? JSON.parse(row.steps) : [],
      tags: row.tags ? JSON.parse(row.tags) : []
    };
    
    res.json(recipe);
  });
});

app.post('/api/recipes/:id/reviews', authMiddleware, (req, res) => {
  const { rating, comment } = req.body;
  const recipeId = req.params.id;
  
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }
  
  db.run(
    'INSERT OR REPLACE INTO reviews (recipe_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
    [recipeId, req.user.id, rating, comment || ''],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to submit review' });
      }
      
      db.all(
        `SELECT rv.*, u.name as userName 
         FROM reviews rv 
         JOIN users u ON rv.user_id = u.id 
         WHERE rv.recipe_id = ? 
         ORDER BY rv.created_at DESC`,
        [recipeId],
        (err, reviews) => {
          res.json({ message: 'Review submitted', reviews: reviews || [] });
        }
      );
    }
  );
});

app.get('/api/tags', (req, res) => {
  db.all('SELECT DISTINCT tags FROM recipes WHERE tags IS NOT NULL AND tags != "[]"', (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    const tagSet = new Set();
    rows.forEach(row => {
      try {
        const tags = JSON.parse(row.tags);
        tags.forEach(tag => tagSet.add(tag));
      } catch (e) {}
    });
    
    res.json(Array.from(tagSet));
  });
});

// ===== AUTH ROUTES =====

// Signup
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }
  
  try {
    // Check if user exists
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, existingUser) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already used' });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      
      // Insert user
      db.run(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [name, email, hash],
        function(err) {
          if (err) {
            return res.status(500).json({ success: false, message: 'Failed to create user' });
          }
          
          const user = { id: this.lastID, name, email };
          const token = generateToken(user);
          
          res.json({
            success: true,
            token,
            user: { id: user.id, name: user.name, email: user.email }
          });
        }
      );
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }
  
  try {
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
      
      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
      
      const token = generateToken(user);
      res.json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Verify token
app.post('/api/auth/verify-token', (req, res) => {
  const { token } = req.body;
  if (!token) return res.json({ success: false });
  
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    db.get('SELECT id, name, email FROM users WHERE id = ?', [payload.id], (err, user) => {
      if (err || !user) {
        return res.json({ success: false });
      }
      res.json({
        success: true,
        user: { id: user.id, name: user.name, email: user.email }
      });
    });
  } catch (err) {
    return res.json({ success: false });
  }
});

// ===== FAVORITES ROUTES =====

// Get user favorites
app.get('/api/me/favorites', authMiddleware, (req, res) => {
  db.all(
    'SELECT recipe_id FROM favorites WHERE user_id = ?',
    [req.user.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      const favorites = rows.map(row => row.recipe_id);
      res.json({ favorites });
    }
  );
});

// Add favorite
app.post('/api/me/favorites/:id', authMiddleware, (req, res) => {
  const recipeId = req.params.id;
  
  db.run(
    'INSERT OR IGNORE INTO favorites (user_id, recipe_id) VALUES (?, ?)',
    [req.user.id, recipeId],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      
      // Return updated favorites list
      db.all(
        'SELECT recipe_id FROM favorites WHERE user_id = ?',
        [req.user.id],
        (err, rows) => {
          if (err) {
            return res.status(500).json({ message: 'Database error' });
          }
          const favorites = rows.map(row => row.recipe_id);
          res.json({ favorites });
        }
      );
    }
  );
});

// Remove favorite
app.delete('/api/me/favorites/:id', authMiddleware, (req, res) => {
  const recipeId = req.params.id;
  
  db.run(
    'DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?',
    [req.user.id, recipeId],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      
      // Return updated favorites list
      db.all(
        'SELECT recipe_id FROM favorites WHERE user_id = ?',
        [req.user.id],
        (err, rows) => {
          if (err) {
            return res.status(500).json({ message: 'Database error' });
          }
          const favorites = rows.map(row => row.recipe_id);
          res.json({ favorites });
        }
      );
    }
  );
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ SQLite backend running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed');
      }
      process.exit(0);
    });
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
