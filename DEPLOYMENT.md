# 📦 Finance Dashboard - VPS Deployment Guide

Panduan lengkap untuk deploy aplikasi Finance Dashboard ke VPS dengan Docker.

## 🛠️ Prerequisites

Pastikan VPS sudah terinstall:

- **Docker** (20.10+)
- **Docker Compose** (v2+)
- **Git**

### Install Docker di Ubuntu/Debian

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
```

---

## 🚀 Deployment Steps

### 1. Clone Repository ke VPS

```bash
# Via SSH atau upload files
git clone <your-repo-url> /opt/finance-dashboard
cd /opt/finance-dashboard
```

### 2. Setup Environment Variables

```bash
# Copy environment template
cp .env.example .env

# Edit dengan nilai production
nano .env
```

**Contoh isi `.env`:**

```env
# IMPORTANT: Ganti dengan password yang kuat!
DB_PASSWORD=MySecurePassword123!

# Generate JWT secret yang random
JWT_SECRET=your-32-character-random-string-here

# Ganti dengan domain/IP VPS
FRONTEND_URL=http://your-vps-ip-or-domain
```

> 💡 **Tip**: Generate JWT secret dengan: `openssl rand -hex 32`

### 3. Build dan Jalankan

```bash
# Build semua images
docker compose build

# Jalankan dalam background
docker compose up -d

# Lihat status containers
docker compose ps

# Lihat logs
docker compose logs -f
```

### 4. Setup Database (First Time Only)

```bash
# Jalankan seed script untuk create table dan dummy user
docker compose exec backend npm run seed
```

### 5. Verifikasi

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

Buka browser: `http://your-vps-ip`

---

## 👤 Dummy Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | admin |
| user@example.com | user123 | user |

---

## 🔧 Useful Commands

### Start/Stop Services

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# Restart specific service
docker compose restart backend

# Stop and remove volumes (WARNING: deletes data!)
docker compose down -v
```

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f postgres
docker compose logs -f frontend
```

### Database Access

```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U postgres -d finance_auth

# Backup database
docker compose exec postgres pg_dump -U postgres finance_auth > backup.sql

# Restore database
docker compose exec -T postgres psql -U postgres finance_auth < backup.sql
```

### Update Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker compose build
docker compose up -d
```

---

## 🔒 SSL/HTTPS Setup (Optional)

Untuk production, gunakan SSL. Contoh dengan Certbot:

```bash
# Install Certbot
sudo apt install certbot

# Get certificate (stop nginx dulu)
docker compose stop frontend
sudo certbot certonly --standalone -d yourdomain.com

# Certificate akan ada di:
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

Update `nginx.conf` untuk SSL configuration.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                      VPS                            │
│                                                     │
│  ┌─────────────┐    ┌─────────────┐                │
│  │   Nginx     │◄───│   Browser   │                │
│  │  (Frontend) │    │             │                │
│  │   :80       │    └─────────────┘                │
│  └──────┬──────┘                                   │
│         │                                          │
│         │ /api/*                                   │
│         ▼                                          │
│  ┌─────────────┐    ┌─────────────┐                │
│  │   Express   │◄───│  PostgreSQL │                │
│  │  (Backend)  │    │   :5432     │                │
│  │   :3000     │    │             │                │
│  └─────────────┘    └─────────────┘                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🔍 Troubleshooting

### Container tidak start

```bash
# Check logs
docker compose logs backend

# Common issues:
# - Database connection refused: tunggu postgres ready
# - Port already in use: stop service lain atau ganti port
```

### Database connection error

```bash
# Pastikan postgres healthy
docker compose ps

# Test connection
docker compose exec postgres pg_isready -U postgres
```

### Frontend tidak bisa connect ke API

```bash
# Check backend running
curl http://localhost:3000/api/health

# Check nginx config
docker compose exec frontend cat /etc/nginx/conf.d/default.conf
```

---

## 📞 Support

Jika ada masalah, check:
1. Docker compose logs
2. Container status dengan `docker compose ps`
3. Network dengan `docker network ls`
