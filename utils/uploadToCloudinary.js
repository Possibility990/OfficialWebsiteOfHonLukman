const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// //CLOUDINARY UPLOAD
// const uploadToCloudinary = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder: 'projects' },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );

//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// };

// module.exports = uploadToCloudinary


// CLOUDINARY UPLOAD
const uploadToCloudinary = (buffer, folder = 'projects') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

module.exports = uploadToCloudinary;
