const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // Use this for AWS RDS connections
  }
});

const createTables = async () => {
  try {
    // Create farmers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS farmers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        contact VARCHAR(20),
        district VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        latitude DECIMAL(10, 8) NOT NULL,
        longitude DECIMAL(11, 8) NOT NULL
      )
    `);
    console.log('Farmers table created or already exists');

    // Create commodities table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS commodities (
        id SERIAL PRIMARY KEY,
        farmer_id INTEGER REFERENCES farmers(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Commodities table created or already exists');

    // Insert sample data only if the tables are empty
    const farmerCount = await pool.query('SELECT COUNT(*) FROM farmers');
    if (parseInt(farmerCount.rows[0].count) === 0) {
      // Insert sample farmers
      const farmers = [
        ['Budi Santoso', '08123456789', 'Jakarta Selatan', 'Jakarta Selatan, DKI Jakarta', -6.2088, 106.8456],
        ['Ani Wijaya', '08234567890', 'Semarang', 'Semarang, Jawa Tengah', -6.9932, 110.4203],
        ['Dedi Kurniawan', '08345678901', 'Sleman', 'Sleman, DI Yogyakarta', -7.7971, 110.3688],
        ['Siti Rahayu', '08456789012', 'Bandung', 'Bandung, Jawa Barat', -6.9147, 107.6098],
        ['Joko Widodo', '08567890123', 'Surabaya', 'Surabaya, Jawa Timur', -7.2575, 112.7521]
      ];

      for (const [name, contact, district, location, latitude, longitude] of farmers) {
        const result = await pool.query(
          'INSERT INTO farmers (name, contact, district, location, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
          [name, contact, district, location, latitude, longitude]
        );
        const farmerId = result.rows[0].id;
        console.log(`Inserted farmer: ${name} with ID: ${farmerId}`);
      }

      // Get all farmer IDs
      const farmerResults = await pool.query('SELECT id, name FROM farmers');
      
      // Insert sample commodities
      const commodities = [
        [1, 'Padi Ciherang', 'padi', 'Siap Panen', 'Organik', 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
        [2, 'Jagung Manis', 'jagung', 'Masa Tanam', 'Non-Organik', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
        [3, 'Bayam Hijau', 'sayur', 'Siap Panen', 'Organik', 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
        [4, 'Mangga Harum Manis', 'buah', 'Perawatan', 'Non-Organik', 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
        [5, 'Padi IR64', 'padi', 'Siap Panen', 'Organik', 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60']
      ];

      for (let i = 0; i < commodities.length; i++) {
        const [farmerIndex, name, type, status, category, imageUrl] = commodities[i];
        const farmerId = farmerResults.rows[farmerIndex - 1].id;
        
        await pool.query(
          'INSERT INTO commodities (farmer_id, name, type, status, category, image_url) VALUES ($1, $2, $3, $4, $5, $6)',
          [farmerId, name, type, status, category, imageUrl]
        );
        console.log(`Inserted commodity: ${name} for farmer ID: ${farmerId}`);
      }
    } else {
      console.log('Sample data already exists, skipping insertion');
    }

    console.log('Database setup completed successfully');
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    pool.end();
  }
};

createTables();
