const { Pool } = require('pg');
require('dotenv').config();

let pool;

// Debug: show what environment variables we have
console.log('🔍 Checking database configuration...');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DB_HOST:', process.env.DB_HOST || '(not set)');

// Check if DATABASE_URL is provided (Coolify style)
if (process.env.DATABASE_URL) {
  console.log('📡 Using DATABASE_URL connection string');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
  });
} else if (process.env.DB_HOST) {
  console.log('📡 Using individual DB_* variables');
  pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  });
} else {
  console.log('⚠️ No database config found, using localhost defaults');
  pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'finance_auth',
    user: 'postgres',
    password: 'postgres',
  });
}

// Test database connection
pool.on('connect', () => {
  console.log('📦 Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
});

module.exports = pool;
