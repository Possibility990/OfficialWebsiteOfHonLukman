const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  }
});

const AchievementSchema = new mongoose.Schema({
  projectcateogry: { // (kept your spelling exactly)
    type: String,
    required: [true, 'Please provide project category'],
    enum:[
    'Education',
    'Health Care',
    'Employment',
    'Agriculture',
    'Rural Electrification',
    'Human Capital Development',
    'Empowerment',
    'Skill Aquisition',
    'Palliatives',
    'Supplies During Festive Period',
    'Other'
        

    ]
  },

  description: {
    type: String,
    trim:true,
    required: [true, 'Please provide description']
  },

  video: {
    type: String,
    required: [true, 'Please provide YouTube link']
  },

  videocaption: { // matches your form
    type: String,
    required: [true, 'Please provide video caption']
  },

  title: {
    type: String,
    required: [true, 'Please provide title']
  },

  images: [ImageSchema] // handles image1–image6
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', AchievementSchema);