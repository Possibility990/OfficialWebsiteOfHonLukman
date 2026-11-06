const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const {
getAllUniversityStudents,
getSingleUniversityStudent,
createUniversityStudent,
updateUniversityStudent,
deleteUniversityStudent
} = require('../controller/universityStudents')

router.route('/')
.get(getAllUniversityStudents)
.post(upload.single('image'), createUniversityStudent)

router.route('/:id')
.get(getSingleUniversityStudent)
.put(upload.single('image'), updateUniversityStudent)
.delete(deleteUniversityStudent)

module.exports = router