const bcrypt = require('bcryptjs');
const pool = require('../config/database');

const seed = async () => {
    console.log('🌱 Starting database seed...\n');

    try {
        // Create users table
        console.log('📋 Creating users table...');
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('✅ Users table created\n');

        // Hash passwords
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', salt);
        const userPassword = await bcrypt.hash('user123', salt);

        // Insert dummy users
        console.log('👤 Creating dummy users...');

        // Admin user
        await pool.query(`
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        password = EXCLUDED.password,
        role = EXCLUDED.role,
        updated_at = CURRENT_TIMESTAMP
    `, ['Administrator', 'admin@example.com', adminPassword, 'admin']);
        console.log('✅ Admin user created: admin@example.com / admin123');

        // Regular user
        await pool.query(`
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        password = EXCLUDED.password,
        role = EXCLUDED.role,
        updated_at = CURRENT_TIMESTAMP
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
        await pool.end();
        process.exit(0);
    }
};

seed();
