const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const seed = async () => {
  console.log('🌱 Starting database seed...\n');

  let connection;

  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      database: process.env.DB_NAME || 'finance_auth',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    console.log('📦 Connected to MySQL database\n');

    // Create users table
    console.log('📋 Creating users table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created\n');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const userPassword = await bcrypt.hash('user123', salt);

    // Insert dummy users
    console.log('👤 Creating dummy users...');

    // Admin user - use INSERT IGNORE or ON DUPLICATE KEY UPDATE
    await connection.query(`
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        password = VALUES(password),
        role = VALUES(role),
        updated_at = NOW()
    `, ['Administrator', 'admin@example.com', adminPassword, 'admin']);
    console.log('✅ Admin user created: admin@example.com / admin123');

    // Regular user
    await connection.query(`
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        password = VALUES(password),
        role = VALUES(role),
        updated_at = NOW()
    `, ['John Doe', 'user@example.com', userPassword, 'user']);
    console.log('✅ Regular user created: user@example.com / user123');

    console.log('\n🎉 Database seed completed successfully!');
    console.log('\n📝 Dummy Accounts:');
    console.log('┌────────────────────────┬────────────┬────────┐');
    console.log('│ Email                  │ Password   │ Role   │');
    console.log('├────────────────────────┼────────────┼────────┤');
    console.log('│ admin@example.com      │ admin123   │ admin  │');
    console.log('│ user@example.com       │ user123    │ user   │');
    console.log('└────────────────────────┴────────────┴────────┘');

  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
};

seed();
