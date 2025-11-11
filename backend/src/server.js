const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
// Allow cross-origin requests from local frontend during development
app.use(cors({ origin: true }));

// Connect to MongoDB with retry logic. This avoids the app crashing immediately
// if Mongo isn't available (useful while you start mongod or use Compass).
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foodrecipeapp';

async function connectWithRetry(retries = 5, delayMs = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Connecting to MongoDB (${i + 1}/${retries}) at ${MONGO_URI}...`);
      // Modern mongoose no longer requires useNewUrlParser/useUnifiedTopology
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB connected');
      return;
    } catch (err) {
      console.warn(`MongoDB connection attempt ${i + 1} failed: ${err.message}`);
      if (i < retries - 1) {
        await new Promise(r => setTimeout(r, delayMs));
      } else {
        throw err;
      }
    }
  }
}

// --- Recipe model ---
const RecipeSchema = new mongoose.Schema({
  name: String,
  category: String,
  ingredients: [String],
  steps: [String],
  image: String,
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

// --- User model for auth and favorites ---
const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});

const User = mongoose.model('User', UserSchema);

app.get('/api/recipes', async (req, res) => {
  const filter = req.query.category ? { category: req.query.category } : {};
  const recipes = await Recipe.find(filter);
  res.json(recipes);
});

app.get('/api/recipes/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: 'Not found' });
  res.json(recipe);
});

app.post('/api/recipes', async (req, res) => {
  const newRecipe = new Recipe(req.body);
  await newRecipe.save();
  res.status(201).json(newRecipe);
});

// --- Simple auth implementation (bcryptjs + jwt) ---
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Invalid token format' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token user' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
}

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: 'Email already used' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, passwordHash: hash });
    await user.save();
    const token = generateToken(user);
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ success: false, message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

app.post('/api/auth/verify-token', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.json({ success: false });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.json({ success: false });
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.json({ success: false });
  }
});

// Favorites endpoints (protected)
app.get('/api/me/favorites', authMiddleware, async (req, res) => {
  const favs = req.user.favorites || [];
  res.json({ favorites: favs });
});

app.post('/api/me/favorites/:id', authMiddleware, async (req, res) => {
  const recipeId = req.params.id;
  if (!recipeId) return res.status(400).json({ message: 'Missing id' });
  if (!req.user.favorites) req.user.favorites = [];
  if (!req.user.favorites.includes(recipeId)) {
    req.user.favorites.push(recipeId);
    await req.user.save();
  }
  res.json({ favorites: req.user.favorites });
});

app.delete('/api/me/favorites/:id', authMiddleware, async (req, res) => {
  const recipeId = req.params.id;
  if (!req.user.favorites) req.user.favorites = [];
  req.user.favorites = req.user.favorites.filter(id => String(id) !== String(recipeId));
  await req.user.save();
  res.json({ favorites: req.user.favorites });
});
// You can add other routes: get single, update, delete, favorite etc.

// Start server only after DB connection succeeds
connectWithRetry(10, 2000)
  .then(() => {
    const server = app.listen(5000, () => console.log('Server running on port 5000'));

    // Graceful shutdown
    const shutdown = () => {
      console.log('Shutting down server...');
      server.close(async () => {
        try {
          await mongoose.disconnect();
          console.log('Mongo disconnected');
        } catch (err) {
          console.error('Error during mongoose disconnect', err);
        }
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB after retries:', err.message || err);
    process.exit(1);
  });
