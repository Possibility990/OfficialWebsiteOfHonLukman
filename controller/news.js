
const News = require('../models/news');
const uploadToCloudinary = require('../utils/uploadToCloudinary');



exports.getNews =  async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12; // default 15
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
};


 exports.getSingleNews = async (req, res, next) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ success: false, error: 'News not found' });
    res.json({ success: true, data: newsItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.createNews = async (req, res) => {
  try {
    const { title, curiosityGap } = req.body;

    const sections = [];

    for (let i = 0; i < 3; i++) {
      const text = req.body[`text${i}`] || '';
      let image = '';

      const file = req.files?.[`image${i}`]?.[0];

      if (file) {
        const result = await uploadToCloudinary(
          file.buffer,
          'news_images'
        );

        image = result.secure_url;
      }

      if (text || image) {
        sections.push({ text, image });
      }
    }

    const news = new News({
      title,
      curiosityGap,
      sections
    });

    const savedNews = await news.save();

    res.json({
      success: true,
      data: savedNews
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong'
    });
  }
};



exports.updatedNews = async (req, res, next) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNews) return res.status(404).json({ success: false, error: 'News not found' });
    res.json({ success: true, data: updatedNews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.deleteNews = async (req, res, next) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) return res.status(404).json({ success: false, error: 'News not found' });
    res.json({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};













