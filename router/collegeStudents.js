const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const {
getCollegeStudents,
getSingleCollegeStudent,
createCollegeStudent,
updateCollegeStudent,
deleteCollegeStudent
} = require('../controller/collegeStudents')


router.route('/')
.get(getCollegeStudents)
.post(upload.single('image'), createCollegeStudent)

router.route('/:id')
.get(getSingleCollegeStudent)
.put(upload.single('image'), updateCollegeStudent)
.delete(deleteCollegeStudent)

module.exports = router 