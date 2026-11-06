const Achievement = require('../models/achievements');
const uploadToCloudinary = require('../utils/uploadToCloudinary')




//  Get Single 
exports.getSingleAchievement =  async (req, res) => {
  try {
    const projects = await Achievement.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//  GET ALL (WITH PAGINATION) 
exports.getAllAchievements = async (req, res, next) => {
  try {
    // page & limit from query params
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;

    // const skip = (page - 1) * limit;

    const projects = await Achievement.find()
      .sort({ createdAt: 1 })   // latest last
      // .skip(skip)
      // .limit(limit);

    const total = await Achievement.countDocuments();

    res.status(200).json({
      // total,
      // page,
      // pages: Math.ceil(total / limit),
      data: projects
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createAchievement = async (req, res) => {
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

        const result = await uploadToCloudinary(file.buffer, 'projects');

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
};


//  UPDATE 
exports.updateAchievement = async (req, res) => {
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

        const result = await uploadToCloudinary(file.buffer, 'projects');

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
};


// DELETE 
exports.deleteAchievement = async (req, res) => {
  try {
    const project = await Achievement.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: 'Deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


