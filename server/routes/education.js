const express = require('express');
const router = express.Router();
const pool = require('../db');

// Update education content
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        title, 
        content, 
        image_url, 
        author, 
        category, 
        featured, 
        read_time, 
        is_video 
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE education_content 
             SET title = $1, 
                 content = $2, 
                 image_url = $3,
                 author = $4,
                 category = $5,
                 featured = $6,
                 read_time = $7,
                 is_video = $8
             WHERE id = $9
             RETURNING *`,
            [title, content, image_url, author, category, featured, read_time, is_video, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Content not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating education content:', error);
        res.status(500).json({ error: 'Failed to update education content' });
    }
});

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
