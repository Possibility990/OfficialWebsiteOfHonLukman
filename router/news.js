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

// ================= POST NEW NEWS =================
router.post(
  '/',
  upload.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { title, curiosityGap } = req.body;

      // ✅ Validation
      if (!title) return res.status(400).json({ success: false, error: 'Title is required' });
      if (!curiosityGap) return res.status(400).json({ success: false, error: 'Curiosity hook is required' });
      if (curiosityGap.length > 120) return res.status(400).json({ success: false, error: 'Curiosity hook cannot exceed 120 characters' });

      const sections = [];

      for (let i = 0; i < 3; i++) {
        let text = req.body[`text${i}`] || '';
        let image = '';

        // Upload image to Cloudinary if provided
        if (req.files && req.files[`image${i}`] && req.files[`image${i}`][0]) {
          const file = req.files[`image${i}`][0];
          const result = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
            { folder: 'news_images' }
          );
          image = result.secure_url;
        }

        if (text || image) {
          sections.push({ text, image });
        }
      }

      // ✅ Save News with curiosityGap
      const news = new News({ title, curiosityGap, sections });
      const savedNews = await news.save();

      res.json({ success: true, data: savedNews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }
);

// ================= GET ALL NEWS =================
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch news' });
  }
});

// ================= GET SINGLE NEWS =================
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ success: false, error: 'News not found' });
    }

    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch news' });
  }
});

// ================= UPDATE NEWS =================
router.put('/:id', upload.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 }
  ]), async (req, res) => {
  try {
    const { title, curiosityGap, sections } = req.body;

    if (!title) return res.status(400).json({ success: false, error: 'Title is required' });
    if (!curiosityGap) return res.status(400).json({ success: false, error: 'Curiosity hook is required' });
    if (curiosityGap.length > 120) return res.status(400).json({ success: false, error: 'Curiosity hook cannot exceed 120 characters' });

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, curiosityGap, sections },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ success: false, error: 'News not found' });
    }

    res.json({ success: true, data: updatedNews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to update news' });
  }
});

// ================= DELETE NEWS =================
router.delete('/:id', async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);

    if (!deletedNews) {
      return res.status(404).json({ success: false, error: 'News not found' });
    }

    res.json({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete news' });
  }
});

module.exports = router;