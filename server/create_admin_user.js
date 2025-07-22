const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function createInitialAdmin() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        // Default admin credentials - CHANGE THESE IN PRODUCTION!
        const username = 'admin';
        const password = 'admin123';

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert admin user
        await pool.query(
            'INSERT INTO admin_users (username, password_hash) VALUES (?, ?)',
            [username, hashedPassword]
        );

        console.log('Admin user created successfully!');
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('\nPlease change these credentials after first login!');
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.log('Admin user already exists!');
        } else {
            console.error('Error creating admin user:', error);
        }
    } finally {
        await pool.end();
    }
}

createInitialAdmin();
