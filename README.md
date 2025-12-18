# Finance Dashboard

Modern authentication system with elegant blue & white design.

## 🚀 Quick Start (Development)

### Prerequisites

- Node.js 18+
- PostgreSQL 15+

### Backend Setup

```bash
cd backend
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database credentials

# Create tables and seed dummy users
npm run seed

# Start server
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## 🐳 Docker Deployment

```bash
# Copy and edit environment
cp .env.example .env

# Build and run
docker compose up -d

# Seed database
docker compose exec backend npm run seed
```

Open http://localhost

## 👤 Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | admin |
| user@example.com | user123 | user |

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT.md) - Complete VPS deployment instructions

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Vanilla CSS
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL
- **Auth**: JWT
- **Deploy**: Docker + Nginx
