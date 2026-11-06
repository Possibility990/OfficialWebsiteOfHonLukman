const multer = require('multer')

//  MULTER 
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


module.exports = uploadFields