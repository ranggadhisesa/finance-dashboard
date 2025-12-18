# 🚀 Panduan Deploy ke aaPanel - Step by Step

Panduan lengkap untuk deploy Finance Dashboard ke VPS menggunakan aaPanel dengan MySQL.

---

## 📋 Prerequisites

- VPS dengan aaPanel sudah terinstall
- Akses ke aaPanel dashboard
- Domain (optional, bisa pakai IP)

---

## STEP 1: Setup aaPanel

### 1.1 Install Required Software

Di aaPanel, pergi ke **App Store** dan install:
- ✅ **Nginx** (versi terbaru)
- ✅ **MySQL 5.7** atau **8.0**
- ✅ **Node.js** (versi 18.x atau 20.x)

---

## STEP 2: Setup MySQL Database

### 2.1 Buat Database

1. Di aaPanel, klik **Database** di sidebar
2. Klik **Add Database**
3. Isi:
   - **Database Name**: `finance_auth`
   - **Username**: `finance_user`
   - **Password**: (generate atau isi manual, **CATAT INI!**)
   - **Access**: `Local (127.0.0.1)`
4. Klik **Submit**

### 2.2 Catat Credentials

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=finance_auth
DB_USER=finance_user
DB_PASSWORD=<password yang tadi>
```

---

## STEP 3: Upload & Setup Backend

### 3.1 Upload Files

1. Di aaPanel, klik **Files** di sidebar
2. Navigate ke `/www/wwwroot/`
3. Buat folder baru: `finance-api`
4. Upload semua file dari folder `backend/` ke `/www/wwwroot/finance-api/`

Atau via terminal:
```bash
cd /www/wwwroot
git clone https://github.com/ranggadhisesa/finance-dashboard.git
mv finance-dashboard/backend finance-api
rm -rf finance-dashboard
```

### 3.2 Install Dependencies

1. Di aaPanel, klik **Terminal** di sidebar
2. Jalankan:

```bash
cd /www/wwwroot/finance-api
npm install
```

### 3.3 Setup Environment

```bash
cd /www/wwwroot/finance-api
cp .env.example .env
nano .env
```

Edit `.env` dengan nilai dari Step 2:
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=finance_auth
DB_USER=finance_user
DB_PASSWORD=<password_dari_step_2>
JWT_SECRET=supersecretkey123changethis
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=production
```

Simpan: `Ctrl+X`, `Y`, `Enter`

### 3.4 Seed Database

```bash
cd /www/wwwroot/finance-api
npm run seed
```

Harusnya muncul:
```
🎉 Database seed completed successfully!
```

### 3.5 Setup Node.js Project di aaPanel

1. Di aaPanel, klik **Node.js** di sidebar
2. Klik **Add Node Project**
3. Isi:
   - **Project Name**: `finance-api`
   - **Project Directory**: `/www/wwwroot/finance-api`
   - **Startup File**: `server.js`
   - **Node Version**: `18.x` atau `20.x`
   - **Port**: `3000`
4. Klik **Submit**
5. Klik **Start** untuk menjalankan project

---

## STEP 4: Upload & Setup Frontend

### 4.1 Build Frontend (di komputer lokal)

```bash
cd frontend
npm install
npm run build
```

Ini akan menghasilkan folder `dist/`

### 4.2 Upload ke Server

1. Di aaPanel, klik **Files**
2. Navigate ke `/www/wwwroot/`
3. Buat folder baru: `finance-web`
4. Upload semua isi dari folder `frontend/dist/` ke `/www/wwwroot/finance-web/`

### 4.3 Setup Website di aaPanel

1. Di aaPanel, klik **Website** di sidebar
2. Klik **Add Site**
3. Isi:
   - **Domain**: `yourdomain.com` atau IP VPS (contoh: `165.101.18.113`)
   - **Root Directory**: `/www/wwwroot/finance-web`
   - **PHP Version**: `Pure Static` (karena ini React app)
4. Klik **Submit**

### 4.4 Setup Nginx untuk SPA & API Proxy

1. Klik website yang baru dibuat
2. Klik tab **Config** atau **Nginx Config**
3. Tambahkan config ini di dalam block `server { }`:

```nginx
# Handle React Router (SPA)
location / {
    try_files $uri $uri/ /index.html;
}

# Proxy API requests to Backend
location /api {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

4. Klik **Save**

---

## STEP 5: Test Aplikasi

1. Buka browser
2. Akses: `http://yourdomain.com` atau `http://your-vps-ip`
3. Login dengan:
   - **Email**: `admin@example.com`
   - **Password**: `admin123`

---

## ✅ Selesai!

Aplikasi sekarang running dengan:
- **Frontend**: Nginx serving static files
- **Backend**: Node.js managed by aaPanel
- **Database**: MySQL

---

## 🔧 Troubleshooting

### Backend tidak bisa connect ke MySQL
```bash
# Test koneksi manual
mysql -u finance_user -p -h 127.0.0.1 finance_auth
```

### API tidak bisa diakses
1. Cek Node.js project running di aaPanel
2. Cek port 3000 tidak diblokir firewall
3. Test langsung: `curl http://127.0.0.1:3000/api/health`

### Frontend blank/error
1. Pastikan sudah build dengan `npm run build`
2. Pastikan upload isi `dist/` bukan folder `dist` itu sendiri
3. Cek Nginx config sudah include `try_files`

### CORS Error
Tambahkan domain ke `FRONTEND_URL` di `.env` backend:
```
FRONTEND_URL=http://yourdomain.com
```

Lalu restart Node.js project di aaPanel.

---

## 📝 Quick Commands

```bash
# Restart backend
cd /www/wwwroot/finance-api && pm2 restart all

# Check backend logs
pm2 logs

# Re-seed database
cd /www/wwwroot/finance-api && npm run seed

# Check MySQL
mysql -u finance_user -p finance_auth
```
