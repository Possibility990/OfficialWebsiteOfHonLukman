
// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // ensure .env is loaded

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

module.exports = cloudinary;