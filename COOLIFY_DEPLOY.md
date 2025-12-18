# 🚀 Panduan Deploy ke Coolify - Step by Step

## Persiapan
- ✅ Code sudah di GitHub: `ranggadhisesa/finance-dashboard`
- ✅ Coolify panel: `http://165.101.18.113:8000`

---

## STEP 1: Setup GitHub Source (Sudah Done)

Kamu sudah selesai setup GitHub App, jadi skip ke Step 2.

---

## STEP 2: Buat Project Baru

1. Klik **"Projects"** di sidebar kiri
2. Klik **"+ Add"** untuk buat project baru
3. Isi nama: `Finance Dashboard`
4. Klik **Save** atau **Create**

---

## STEP 3: Buat PostgreSQL Database

1. Di dalam project, klik **"+ New"** atau **"+ Add Resource"**
2. Pilih **"Database"**
3. Pilih **"PostgreSQL"**
4. Pilih **"PostgreSQL 15"** (atau versi terbaru)
5. Klik **"Continue"**

### Setelah database dibuat:
6. Pergi ke tab **"Configuration"** atau **"Settings"**
7. Catat/copy nilai ini (akan dipakai nanti):
   - **Database Name**: `postgres` (atau buat baru: `finance_auth`)
   - **Username**: `postgres`
   - **Password**: (di-generate otomatis, COPY INI!)
   - **Internal Host**: biasanya seperti `postgresql-xxxxx`
   - **Port**: `5432`

8. Klik **"Deploy"** untuk start database
9. Tunggu status **"Running"** ✅

---

## STEP 4: Deploy Backend

1. Kembali ke Project, klik **"+ New"** atau **"+ Add Resource"**
2. Pilih **"Public Repository"** atau **"GitHub"**
3. Pilih repository: `finance-dashboard`
4. Klik **"Load Repository"**

### Configuration:
5. Isi seperti ini:
   - **Branch**: `main`
   - **Build Pack**: `Dockerfile`
   - **Base Directory**: `/backend`
   - **Port**: `3000`
   - **Is it a static site?**: ❌ JANGAN dicentang

6. Klik **"Continue"**

### Environment Variables:
7. Pergi ke tab **"Environment Variables"**
8. Tambahkan variable ini (klik + Add):

```
NODE_ENV=production
PORT=3000
DB_HOST=<Internal Host PostgreSQL dari Step 3>
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=<Password dari Step 3>
JWT_SECRET=supersecretkey123changemelater
JWT_EXPIRES_IN=7d
FRONTEND_URL=*
```

> ⚠️ Ganti `<Internal Host PostgreSQL dari Step 3>` dan `<Password dari Step 3>` dengan nilai yang kamu catat tadi!

9. Klik **"Deploy"**
10. Tunggu status **"Running"** ✅

### Seed Database (Buat Table & Dummy User):
11. Pergi ke tab **"Terminal"** atau **"Execute Command"**
12. Jalankan: `npm run seed`
13. Harusnya muncul: "Database seed completed successfully!"

---

## STEP 5: Deploy Frontend

1. Kembali ke Project, klik **"+ New"** atau **"+ Add Resource"**
2. Pilih **"Public Repository"** atau **"GitHub"**
3. Pilih repository: `finance-dashboard`
4. Klik **"Load Repository"**

### Configuration:
5. Isi seperti ini:
   - **Branch**: `main`
   - **Build Pack**: `Dockerfile`
   - **Base Directory**: `/frontend`
   - **Port**: `80`
   - **Is it a static site?**: ❌ JANGAN dicentang

6. Klik **"Continue"**

### Environment Variables:
7. Pergi ke tab **"Environment Variables"**
8. Tambahkan:

```
VITE_API_URL=<URL Backend dari Step 4>
```

> Contoh: `VITE_API_URL=https://backend-xxxxx.165.101.18.113.sslip.io`

9. Klik **"Deploy"**
10. Tunggu status **"Running"** ✅

---

## STEP 6: Setup Domain/URL

### Untuk Backend:
1. Buka resource Backend
2. Pergi ke tab **"Settings"** atau **"Domains"**
3. Tambah domain atau gunakan auto-generated URL
4. Contoh: `api.yourdomain.com` atau `backend-xxxxx.165.101.18.113.sslip.io`

### Untuk Frontend:
1. Buka resource Frontend
2. Pergi ke tab **"Settings"** atau **"Domains"**
3. Tambah domain atau gunakan auto-generated URL
4. Contoh: `yourdomain.com` atau `frontend-xxxxx.165.101.18.113.sslip.io`

---

## STEP 7: Update Frontend API URL

Setelah Backend punya URL:
1. Buka Frontend resource
2. Update Environment Variable:
   - `VITE_API_URL` = URL Backend yang sudah jadi

3. Klik **"Redeploy"**

---

## ✅ SELESAI!

Buka URL Frontend di browser, harusnya bisa login dengan:
- **Email**: `admin@example.com`
- **Password**: `admin123`

---

## 🔧 Troubleshooting

### Backend error "ECONNREFUSED"
- Pastikan DB_HOST pakai **Internal Host** PostgreSQL (bukan localhost)
- Pastikan PostgreSQL sudah Running

### Login gagal "Network Error"
- Pastikan VITE_API_URL di Frontend sudah benar
- Pastikan Backend sudah Running
- Cek apakah Backend accessible (buka URL backend di browser, harusnya ada response JSON)

### Database error
- Pastikan sudah jalankan `npm run seed` di terminal Backend
