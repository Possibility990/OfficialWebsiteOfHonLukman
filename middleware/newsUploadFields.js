const cloudinary = require('../config/cloudinary');
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() });


 const upLoadFields = upload.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 }
  ])


  module.exports = upLoadFields