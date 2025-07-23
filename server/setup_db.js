const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Database connection configuration
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'tanipintar',
    password: process.env.DB_PASSWORD || 'your_password',
    port: process.env.DB_PORT || 5432,
});

async function setupDatabase() {
    try {
        // Read the schema file
        const schemaSQL = fs.readFileSync(path.join(__dirname, 'db_schema.sql'), 'utf8');
        
        // Connect to database
        const client = await pool.connect();
        
        try {
            // Execute the schema SQL
            await client.query(schemaSQL);
            console.log('Database setup completed successfully');
        } finally {
            // Release the client back to the pool
            client.release();
        }
    } catch (err) {
        console.error('Error setting up database:', err);
        process.exit(1);
    } finally {
        // Close the pool
        await pool.end();
    }
}

// Run the setup
setupDatabase();
