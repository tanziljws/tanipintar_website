const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all education content
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                id,
                title,
                content as description,
                image_url,
                author,
                category,
                created_at,
                featured,
                read_time,
                is_video
            FROM education_content
            ORDER BY created_at DESC
        `);
        
        res.json(result.rows.map(item => ({
            ...item,
            date: item.created_at.toISOString().split('T')[0],
            readTime: item.read_time,
            image: item.image_url,
            isVideo: item.is_video
        })));
    } catch (error) {
        console.error('Error fetching education content:', error);
        res.status(500).json({ error: 'Failed to fetch education content' });
    }
});

module.exports = router;
