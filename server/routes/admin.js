const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = express.Router();
const pool = require('../db');

// Admin login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Get user from database
        const [rows] = await pool.query(
            'SELECT * FROM admin_users WHERE username = ?',
            [username]
        );

        const user = rows[0];
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Protected routes
// Update education content
router.put('/education/:id', auth, async (req, res) => {
    try {
        const { title, content, image_url } = req.body;
        const [result] = await pool.query(
            'UPDATE education_content SET title = ?, content = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [title, content, image_url, req.params.id]
        );
        
        if (result.affectedRows > 0) {
            const [updated] = await pool.query(
                'SELECT * FROM education_content WHERE id = ?',
                [req.params.id]
            );
            res.json(updated[0]);
        } else {
            res.status(404).json({ error: 'Content not found' });
        }
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create education content
router.post('/education', auth, async (req, res) => {
    try {
        const { title, content, image_url } = req.body;
        const result = await pool.query(
            'INSERT INTO education_content (title, content, image_url) VALUES ($1, $2, $3) RETURNING *',
            [title, content, image_url]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update map marker
router.put('/map-marker/:id', auth, async (req, res) => {
    try {
        const { title, description, latitude, longitude, marker_type } = req.body;
        const result = await pool.query(
            'UPDATE map_markers SET title = $1, description = $2, latitude = $3, longitude = $4, marker_type = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
            [title, description, latitude, longitude, marker_type, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Create map marker
router.post('/map-marker', auth, async (req, res) => {
    try {
        const { title, description, latitude, longitude, marker_type } = req.body;
        const result = await pool.query(
            'INSERT INTO map_markers (title, description, latitude, longitude, marker_type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, latitude, longitude, marker_type]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
