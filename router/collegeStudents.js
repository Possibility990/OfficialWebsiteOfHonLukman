const express = require('express');
const router = express.Router();
const multer = require('multer');
const streamifier = require('streamifier');
const Student = require('../models/collegeStudents');
const cloudinary = require('../config/cloudinary');

const upload = multer({ storage: multer.memoryStorage() });

/* =========================
   📥 GET ALL COLLEGE STUDENTS
========================= */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15; // default 15
    const total = await Student.countDocuments();

    const query = Student.find().sort({ createdAt: -1 });
    if (limit > 0) query.skip((page - 1) * limit).limit(limit);

    const students = await query;

    res.json({
      success: true,
      data: students,
      page: limit > 0 ? page : 1,
      limit,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      totalResults: total
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* =========================
   📄 GET SINGLE STUDENT
========================= */
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* =========================
   📝 CREATE STUDENT
========================= */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = null;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'college_students' },
          (error, result) => (result ? resolve(result) : reject(error))
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      imageUrl = result.secure_url;
    }

    const student = new Student({ ...req.body, image: imageUrl, educationLevel: 'College' });
    const savedStudent = await student.save();
    res.json({ success: true, data: savedStudent });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* =========================
   ✏️ UPDATE STUDENT
========================= */
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'college_students' },
          (error, result) => (result ? resolve(result) : reject(error))
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      updateData.image = result.secure_url;
    }
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedStudent) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, data: updatedStudent });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* =========================
   🗑 DELETE STUDENT
========================= */
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;