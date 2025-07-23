const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = express.Router();
const pool = require('../db');

// Get all farmers
router.get('/farmers', auth, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM farmers ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new farmer
router.post('/farmers', auth, async (req, res) => {
    try {
        const {
            name,
            district,
            commodity_name,
            commodity_type,
            contact,
            location,
            latitude,
            longitude,
            status
        } = req.body;

        const result = await pool.query(
            'INSERT INTO farmers (name, district, commodity_name, commodity_type, contact, location, latitude, longitude, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [name, district, commodity_name, commodity_type, contact, location, latitude, longitude, status]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update farmer
router.put('/farmers/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            district,
            commodity_name,
            commodity_type,
            contact,
            location,
            latitude,
            longitude,
            status
        } = req.body;

        const result = await pool.query(
            'UPDATE farmers SET name = $1, district = $2, commodity_name = $3, commodity_type = $4, contact = $5, location = $6, latitude = $7, longitude = $8, status = $9, updated_at = CURRENT_TIMESTAMP WHERE id = $10 RETURNING *',
            [name, district, commodity_name, commodity_type, contact, location, latitude, longitude, status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete farmer
router.delete('/farmers/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM farmers WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        res.json({ message: 'Farmer deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Get user from database
        const result = await pool.query(
            'SELECT * FROM admin_users WHERE username = $1',
            [username]
        );

        const user = result.rows[0];
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
