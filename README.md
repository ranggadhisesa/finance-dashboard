# Finance Dashboard

Modern authentication system with elegant blue & white design.

## 🚀 Tech Stack

- **Frontend**: React + Vite + Vanilla CSS
- **Backend**: Express.js + Node.js
- **Database**: MySQL
- **Auth**: JWT

## 🏃 Quick Start (Development)

### Prerequisites

- Node.js 18+
- MySQL 5.7+ or 8.0

### Backend Setup

```bash
cd backend
npm install

# Setup environment
cp .env.example .env
# Edit .env with your MySQL credentials

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

## 👤 Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | admin |
| user@example.com | user123 | user |

## 📚 Deployment

- [aaPanel Deployment Guide](AAPANEL_DEPLOY.md) - Deploy ke VPS dengan aaPanel + MySQL

## 📁 Project Structure

```
├── backend/          # Express.js API
│   ├── config/       # Database configuration
│   ├── middleware/   # JWT auth middleware
│   ├── routes/       # API routes
│   └── scripts/      # Database seed script
│
└── frontend/         # React application
    ├── src/
    │   ├── context/  # Auth state management
    │   └── pages/    # Login & Dashboard pages
    └── public/
```
