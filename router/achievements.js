const express = require('express');
const router = express.Router();
const multer = require('multer');

const Achievement = require('../models/achievements');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');


// ================= MULTER =================
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500 * 1024 }
});

const uploadFields = upload.fields([
  { name: 'image1' },
  { name: 'image2' },
  { name: 'image3' },
  { name: 'image4' },
  { name: 'image5' },
  { name: 'image6' }
]);


// ================= CLOUDINARY UPLOAD =================
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'projects' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};


// ================= Get Single =================
router.get('/:id', async (req, res) => {
  try {
    const projects = await Achievement.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= GET ALL (WITH PAGINATION) =================
router.get('/', async (req, res) => {
  try {
    // page & limit from query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const projects = await Achievement.find()
      .sort({ createdAt: 1 })   // latest last
      .skip(skip)
      .limit(limit);

    const total = await Achievement.countDocuments();

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: projects
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= CREATE =================
router.post('/', uploadFields, async (req, res) => {
  try {
    const images = [];

    const map = [
      { file: 'image1', caption: 'firstimage' },
      { file: 'image2', caption: 'secondimage' },
      { file: 'image3', caption: 'thirdimage' },
      { file: 'image4', caption: 'fourthimage' },
      { file: 'image5', caption: 'fifthimage' },
      { file: 'image6', caption: 'sixthimage' }
    ];

    for (const item of map) {
      if (req.files?.[item.file]?.[0]) {
        const file = req.files[item.file][0];

        const result = await uploadToCloudinary(file.buffer);

        images.push({
          url: result.secure_url,
          caption: req.body[item.caption] || ''
        });
      }
    }

    if (!req.body.title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const project = await Achievement.create({
      projectcateogry: req.body.projectcateogry,
      description: req.body.description,
      video: req.body.video,
      videocaption: req.body.videocaption,
      title: req.body.title,
      link:req.body.link,
      images
    });

    res.status(201).json(project);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= UPDATE =================
router.put('/:id', uploadFields, async (req, res) => {
  try {
    const images = [];

    const map = [
      { file: 'image1', caption: 'firstimage' },
      { file: 'image2', caption: 'secondimage' },
      { file: 'image3', caption: 'thirdimage' },
      { file: 'image4', caption: 'fourthimage' },
      { file: 'image5', caption: 'fifthimage' },
      { file: 'image6', caption: 'sixthimage' }
    ];

    for (const item of map) {
      if (req.files?.[item.file]) {
        const file = req.files[item.file][0];

        const result = await uploadToCloudinary(file.buffer);

        images.push({
          url: result.secure_url,
          caption: req.body[item.caption] || ''
        });
      }
    }

    console.log(req.body.link)

    const updatedData = {
      projectcateogry: req.body.projectcateogry,
      description: req.body.description,
      video: req.body.video,
      videocaption: req.body.videocaption,
      title: req.body.title
    };

    if (images.length > 0) {
      updatedData.images = images;
    }

    const project = await Achievement.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.status(200).json(project);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= DELETE =================
router.delete('/:id', async (req, res) => {
  try {
    const project = await Achievement.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: 'Deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;