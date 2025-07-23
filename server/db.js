const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    },
    max: 10, // maximum number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
});

module.exports = pool;
