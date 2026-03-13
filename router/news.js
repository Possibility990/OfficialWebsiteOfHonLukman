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

      if (!title)
        return res.status(400).json({ success: false, error: 'Title is required' });

      if (!curiosityGap)
        return res.status(400).json({ success: false, error: 'Curiosity hook is required' });

      if (curiosityGap.length > 120)
        return res.status(400).json({
          success: false,
          error: 'Curiosity hook cannot exceed 120 characters'
        });

      const sections = [];

      for (let i = 0; i < 3; i++) {
        let text = req.body[`text${i}`] || '';
        let image = '';

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

      const news = new News({ title, curiosityGap, sections });

      const savedNews = await news.save();

      res.json({ success: true, data: savedNews });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }
);


// ================= GET ALL NEWS (WITH PAGINATION + SEARCH) =================
// ================= GET ALL NEWS (with pagination, search, default limit 15) =================
router.get('/', async (req, res) => {
  try {
    // 1️⃣ Read query params
    const page = parseInt(req.query.page) || 1;           // current page, default 1
    const limit = parseInt(req.query.limit) || 15;        // default 15 per page
    const search = req.query.search || '';                // search term

    // 2️⃣ Build search query
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { curiosityGap: { $regex: search, $options: 'i' } },
          { 'sections.text': { $regex: search, $options: 'i' } }
        ]
      };
    }

    // 3️⃣ Calculate skip for pagination
    const skip = (page - 1) * limit;

    // 4️⃣ Fetch news with skip & limit
    const news = await News.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    // 5️⃣ Count total matching news
    const totalResults = await News.countDocuments(query);

    // 6️⃣ Calculate total pages
    const totalPages = Math.ceil(totalResults / limit);

    // 7️⃣ Send response
    res.json({
      success: true,
      page,
      totalPages,
      totalResults,
      data: news
    });

  } catch (error) {
    console.error(error);
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
router.put('/:id',
  upload.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 }
  ]),
  async (req, res) => {

    try {

      const { title, curiosityGap, sections } = req.body;

      if (!title)
        return res.status(400).json({ success: false, error: 'Title is required' });

      if (!curiosityGap)
        return res.status(400).json({ success: false, error: 'Curiosity hook is required' });

      if (curiosityGap.length > 120)
        return res.status(400).json({
          success: false,
          error: 'Curiosity hook cannot exceed 120 characters'
        });

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
  }
);


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