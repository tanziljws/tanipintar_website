const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db');
const adminRoutes = require('./routes/admin');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});

// Routes
app.use('/api/admin', adminRoutes);

// Test database connection
pool.query('SELECT 1')
  .then(() => {
    console.log('Connected to MariaDB database');
    // Start server after successful database connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => console.error('Database connection error:', err));

// List all tables in the database for debugging
app.get('/api/tables', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error listing tables:', err);
    res.status(500).json({ error: 'Failed to list tables', details: err.message });
  }
});

// API Routes - Using the farmers and commodities tables
app.get('/api/farmers', async (req, res) => {
  try {
    // Query the farmers and commodities tables
    const result = await pool.query(`
      SELECT 
        f.id, 
        f.name, 
        f.contact, 
        f.district, 
        f.location, 
        f.latitude,
        f.longitude,
        c.name as commodity_name,
        c.type as commodity_type,
        c.status,
        c.category,
        c.image_url
      FROM farmers f
      LEFT JOIN commodities c ON f.id = c.farmer_id
    `);
    
    console.log('Query result count:', result.rows.length);
    
    // Transform the data to match the frontend structure
    const farmers = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      position: [parseFloat(row.latitude), parseFloat(row.longitude)],
      commodity: row.commodity_type,
      commodityName: row.commodity_name,
      location: row.location,
      district: row.district,
      status: row.status,
      contact: row.contact,
      image: row.image_url,
      category: row.category
    }));
    
    return res.json(farmers);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Database query failed', details: err.message });
  }
});

// Get farmer count by district for chart
app.get('/api/farmers/distribution', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT district, COUNT(*) as count
      FROM farmers
      GROUP BY district
      ORDER BY count DESC
    `);
    
    // Convert count from string to number
    const distribution = result.rows.map(row => ({
      district: row.district,
      count: parseInt(row.count)
    }));
    
    return res.json(distribution);
  } catch (err) {
    console.error('Error in distribution endpoint:', err);
    res.status(500).json({ error: 'Failed to get distribution data', details: err.message });
  }
});

// Get commodity types count
app.get('/api/commodities/types', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT type, COUNT(*) as count
      FROM commodities
      GROUP BY type
      ORDER BY count DESC
    `);
    
    // Convert count from string to number
    const typeCounts = result.rows.map(row => ({
      type: row.type,
      count: parseInt(row.count)
    }));
    
    return res.json(typeCounts);
  } catch (err) {
    console.error('Error in commodity types endpoint:', err);
    res.status(500).json({ error: 'Failed to get commodity types data', details: err.message });
  }
});

// Get all districts
app.get('/api/districts', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT district
      FROM farmers
      ORDER BY district
    `);
    
    const districts = result.rows.map(row => row.district);
    return res.json(districts);
  } catch (err) {
    console.error('Error in districts endpoint:', err);
    res.status(500).json({ error: 'Failed to get districts data', details: err.message });
  }
});

// Get all commodity types
app.get('/api/commodity-types', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT type
      FROM commodities
      ORDER BY type
    `);
    
    const types = result.rows.map(row => row.type);
    return res.json(types);
  } catch (err) {
    console.error('Error in commodity types endpoint:', err);
    res.status(500).json({ error: 'Failed to get commodity types data', details: err.message });
  }
});
