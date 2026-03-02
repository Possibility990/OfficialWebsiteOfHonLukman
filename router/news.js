const express = require('express');
const router = express.Router();
const multer = require('multer');
const News = require('../models/news');
const cloudinary = require('cloudinary').v2;

// ================= CLOUDINARY CONFIG =================
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// ================= MULTER (memory storage) =================
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * GET all news
 */
router.get('/', async (req, res) => {
    try {
        const news = await News.find();
        res.json({ success: true, data: news });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

/**
 * GET news by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ success: false, error: 'News not found' });
        }
        res.json({ success: true, data: news });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

/**
 * POST new news with multiple sections (Cloudinary upload)
 */
router.post('/', upload.array('images'), async (req, res) => {
    try {
        const { title } = req.body;

        const uploadedImages = [];

        // Upload each file to Cloudinary using async/await
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
                {
                    folder: 'news_images'
                }
            );

            uploadedImages.push(result.secure_url);
        }

        // Map sections with Cloudinary image URLs
        const sections = (req.body.sections || []).map((section, index) => ({
            text: section.text || '',
            image: uploadedImages[index] || ''
        }));

        const news = new News({ title, sections });
        const savedNews = await news.save();

        res.json({ success: true, data: savedNews });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

/**
 * DELETE news by ID
 */
router.delete('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ success: false, error: 'News not found' });
        }

        await News.findByIdAndDelete(req.params.id);

        res.json({ success: true, data: {} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

module.exports = router;