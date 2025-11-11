# Island Table Backend - SQLite Version

This is the backend API for the Island Table Sri Lankan recipe app, using **SQLite** as the database.

## Features

- ✅ SQLite database (no MongoDB required)
- ✅ User authentication (signup/login with JWT)
- ✅ Recipe CRUD operations
- ✅ Favorites system
- ✅ CORS enabled for frontend

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Install SQLite3 (if not already installed)

```bash
npm install sqlite3
```

### 3. Environment Variables (Optional)

Create a `.env` file in the backend directory:

```
PORT=5000
JWT_SECRET=your-secret-key-here
```

### 4. Start the Server

```bash
npm start
```

The server will start on `http://localhost:5000` and automatically create the SQLite database file `recipes.db`.

## API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes (optional `?category=` filter)
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes` - Create new recipe

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-token` - Verify JWT token

### Favorites (Protected)
- `GET /api/me/favorites` - Get user's favorites
- `POST /api/me/favorites/:id` - Add recipe to favorites
- `DELETE /api/me/favorites/:id` - Remove recipe from favorites

## Database Schema

### Tables

**recipes**
- id (PRIMARY KEY)
- name, title, category, prepTime, difficulty
- image, description
- ingredients (JSON), steps (JSON)
- created_at

**users**
- id (PRIMARY KEY)
- name, email (UNIQUE), password_hash
- created_at

**favorites**
- id (PRIMARY KEY)
- user_id, recipe_id (FOREIGN KEYS)
- created_at
- UNIQUE(user_id, recipe_id)

## Migration from MongoDB

The old MongoDB server is still available in `src/server.js`. You can run it with:

```bash
npm run start:mongo
```

But the default `npm start` now uses SQLite.

## Notes

- The SQLite database file (`recipes.db`) is created automatically in the backend root directory
- No separate database server needed
- All data is stored in a single file
- Perfect for development and small to medium deployments
