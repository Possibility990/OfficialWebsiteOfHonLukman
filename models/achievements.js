const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''  
  }
});

const AchievementSchema = new mongoose.Schema({
  projectcateogry: {  
    type: String,
    required: [true, 'Please provide project category'],
    enum: [
      'Education',
      'Health',
      'Employment',
      'Agriculture',
      'Rural-Electrification',
      'Human-Capital-Development',
      'Empowerment',
      'Skill-Acquisition',
      'Palliative',
      'Festive-Supply',
      'Road-Infrastructure',
      'Water-Supply',
      'Others'
    ]
  },

  description: {
    type: String,
    trim: true
  },

  video: {
    type: String,
    default: ''   
  },

  videocaption: {
    type: String,
    default: ''   
  },

  title: {
    type: String,
    required: [true, 'Please provide title']
  },

  link: {
    type: String,
    default: ''  
  },

  images: [ImageSchema]

}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', AchievementSchema);