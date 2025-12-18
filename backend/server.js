const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const pool = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({
            success: true,
            message: 'Server is healthy',
            timestamp: new Date().toISOString(),
            database: 'connected'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server is unhealthy',
            database: 'disconnected'
        });
    }
});

// API Routes
app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
  ╔════════════════════════════════════════════╗
  ║                                            ║
  ║   🚀 Server running on port ${PORT}           ║
  ║                                            ║
  ║   📍 Local:    http://localhost:${PORT}       ║
  ║   📦 API:      http://localhost:${PORT}/api   ║
  ║                                            ║
  ╚════════════════════════════════════════════╝
  `);
});

module.exports = app;
