const mongoose = require('mongoose');

const collegeStudentSchema = new mongoose.Schema(
{
  image: {
    type: String
  },

  fullname: {
    type: String
  },

  level: {
    type: String
  },

  degree: {
    type: String
  },

  course: {
    type: String
  },

  email: {
    type: String
  },

  tel: {
    type: String
  },

  lga: {
    type: String
  },

  address: {
    type: String
  },

  dob: {
    type: Date
  },

  parentname: {
    type: String
  },

  parenttel: {
    type: String
  }

},
{
  timestamps: true
});

module.exports = mongoose.model('CollegeStudent', collegeStudentSchema);