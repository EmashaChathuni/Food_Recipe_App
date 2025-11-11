# 🚀 Deployment Guide - GitHub & Docker Hub

This guide will help you push your code to GitHub and deploy using Docker Hub.

## 📦 What's Ready

- ✅ Backend (SQLite) - Updated Dockerfile
- ✅ Frontend (React) - Multi-stage build with Nginx
- ✅ Docker Compose - Production-ready setup
- ✅ All images updated to authentic Sri Lankan photos
- ✅ Build errors fixed

---

## 1️⃣ Push to GitHub

### Step 1: Check Status

```bash
cd d:\food-recipe-app
git status
```

### Step 2: Add All Changes

```bash
git add .
```

### Step 3: Commit Changes

```bash
git commit -m "✨ Update: SQLite backend, authentic Sri Lankan images, production-ready Docker setup"
```

### Step 4: Push to GitHub

If you haven't set up remote yet:

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/island-table-app.git
git branch -M main
git push -u origin main
```

If remote already exists:

```bash
git push origin main
```

---

## 2️⃣ Build & Test Docker Images Locally

### Build Backend Image

```bash
cd d:\food-recipe-app
docker build -t island-table-backend:latest ./backend
```

### Build Frontend Image

```bash
docker build -t island-table-frontend:latest ./frontend
```

### Test with Docker Compose

```bash
docker-compose up -d
```

Visit: http://localhost to see your app!

Stop containers:
```bash
docker-compose down
```

---

## 3️⃣ Push to Docker Hub

### Step 1: Login to Docker Hub

```bash
docker login
```
Enter your Docker Hub username and password.

### Step 2: Tag Images

```bash
# Replace YOUR_DOCKERHUB_USERNAME with your actual username
docker tag island-table-backend:latest YOUR_DOCKERHUB_USERNAME/island-table-backend:latest
docker tag island-table-frontend:latest YOUR_DOCKERHUB_USERNAME/island-table-frontend:latest
```

### Step 3: Push Images

```bash
docker push YOUR_DOCKERHUB_USERNAME/island-table-backend:latest
docker push YOUR_DOCKERHUB_USERNAME/island-table-frontend:latest
```

### Step 4: Add Version Tags (Optional)

```bash
docker tag island-table-backend:latest YOUR_DOCKERHUB_USERNAME/island-table-backend:v1.0.0
docker tag island-table-frontend:latest YOUR_DOCKERHUB_USERNAME/island-table-frontend:v1.0.0

docker push YOUR_DOCKERHUB_USERNAME/island-table-backend:v1.0.0
docker push YOUR_DOCKERHUB_USERNAME/island-table-frontend:v1.0.0
```

---

## 4️⃣ Deploy from Docker Hub

Anyone can now deploy your app:

```bash
# Create docker-compose.yml with your Docker Hub images
version: '3.8'

services:
  backend:
    image: YOUR_DOCKERHUB_USERNAME/island-table-backend:latest
    ports:
      - "5000:5000"
    environment:
      - JWT_SECRET=your-production-secret
    volumes:
      - backend-data:/app/data
    restart: unless-stopped

  frontend:
    image: YOUR_DOCKERHUB_USERNAME/island-table-frontend:latest
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  backend-data:
```

Then run:
```bash
docker-compose up -d
```

---

## 5️⃣ CI/CD with GitHub Actions (Optional)

Create `.github/workflows/docker-publish.yml`:

```yaml
name: Build and Push Docker Images

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
    
    - name: Build and push backend
      uses: docker/build-push-action@v4
      with:
        context: ./backend
        push: true
        tags: |
          ${{ secrets.DOCKERHUB_USERNAME }}/island-table-backend:latest
          ${{ secrets.DOCKERHUB_USERNAME }}/island-table-backend:${{ github.sha }}
    
    - name: Build and push frontend
      uses: docker/build-push-action@v4
      with:
        context: ./frontend
        push: true
        tags: |
          ${{ secrets.DOCKERHUB_USERNAME }}/island-table-frontend:latest
          ${{ secrets.DOCKERHUB_USERNAME }}/island-table-frontend:${{ github.sha }}
```

Add secrets in GitHub:
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

---

## 📝 Files Updated/Created

### Updated Files:
- ✅ `backend/Dockerfile` - SQLite support, production-ready
- ✅ `frontend/Dockerfile` - Multi-stage build with Nginx
- ✅ `docker-compose.yml` - Complete orchestration
- ✅ `.gitignore` - Exclude SQLite database
- ✅ `frontend/src/App.js` - Fixed unused import warning
- ✅ `frontend/src/Components/RecipeCard.js` - Fixed unused variable warning

### New Files:
- ✅ `frontend/nginx.conf` - Production Nginx configuration
- ✅ `DEPLOYMENT.md` - This deployment guide
- ✅ `backend/README.md` - Backend documentation
- ✅ `SETUP_COMPLETE.md` - Complete setup guide

---

## 🔒 Security Notes

1. **Change JWT Secret** in production:
   ```bash
   # In docker-compose.yml
   JWT_SECRET=your-super-secure-random-string-here
   ```

2. **Don't commit** `.env` files to GitHub

3. **Use Docker secrets** for sensitive data in production

4. **Update CORS** in backend for production domains

---

## 🎯 Quick Commands Reference

```bash
# Build locally
docker-compose build

# Run locally
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Build and push to Docker Hub
docker build -t YOUR_USERNAME/island-table-backend:latest ./backend
docker build -t YOUR_USERNAME/island-table-frontend:latest ./frontend
docker push YOUR_USERNAME/island-table-backend:latest
docker push YOUR_USERNAME/island-table-frontend:latest
```

---

## ✨ What's Included

### Backend
- SQLite database (no external DB needed)
- User authentication (JWT)
- Recipe CRUD operations
- Favorites system
- Health checks
- Auto-restart on failure

### Frontend
- React production build
- Nginx web server
- React Router support
- Asset caching
- Security headers
- Health checks

### Infrastructure
- Volume persistence for database
- Network isolation
- Proper container dependencies
- Health monitoring

---

**You're ready to deploy! 🚀**

Choose your deployment:
1. **GitHub** → Push your code
2. **Docker Hub** → Share Docker images
3. **Cloud** → Deploy anywhere (AWS, Azure, GCP, DigitalOcean, etc.)
