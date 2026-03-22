const express = require('express');
const router = express.Router();
const multer = require('multer');
const streamifier = require('streamifier');
const News = require('../models/news');
const cloudinary = require('../config/cloudinary');

const upload = multer({ storage: multer.memoryStorage() });

/* =========================
   📥 GET ALL NEWS (page + limit)
========================= */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15; // default 15
    const total = await News.countDocuments();

    const query = News.find().sort({ createdAt: -1 });
    if (limit > 0) query.skip((page - 1) * limit).limit(limit);

    const news = await query;

    res.json({
      success: true,
      data: news,
      page: limit > 0 ? page : 1,
      limit,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      totalResults: total
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* =========================
   📄 GET SINGLE NEWS ITEM
========================= */
router.get('/:id', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ success: false, error: 'News not found' });
    res.json({ success: true, data: newsItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* =========================
   📝 CREATE NEWS
========================= */
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
      const sections = [];

      for (let i = 0; i < 3; i++) {
        let text = req.body[`text${i}`] || '';
        let image = '';

        if (req.files && req.files[`image${i}`]?.[0]) {
          const file = req.files[`image${i}`][0];
          const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: 'news_images' },
              (error, result) => (result ? resolve(result) : reject(error))
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
          });
          image = result.secure_url;
        }

        if (text || image) sections.push({ text, image });
      }

      const news = new News({ title, curiosityGap, sections });
      const savedNews = await news.save();
      res.json({ success: true, data: savedNews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }
);

/* =========================
   ✏️ UPDATE NEWS
========================= */
router.put('/:id', async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNews) return res.status(404).json({ success: false, error: 'News not found' });
    res.json({ success: true, data: updatedNews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* =========================
   🗑 DELETE NEWS
========================= */
router.delete('/:id', async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) return res.status(404).json({ success: false, error: 'News not found' });
    res.json({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;