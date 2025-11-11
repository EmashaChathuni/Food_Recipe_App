# Backend Dockerfile - SQLite Version
FROM node:18-alpine

# Install SQLite3 dependencies
RUN apk add --no-cache sqlite python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Create directory for SQLite database
RUN mkdir -p /app/data

# Expose port
EXPOSE 5000

# Start the SQLite server
CMD ["node", "src/server-sqlite.js"]
