
const Student = require('../models/collegeStudents');
const uploadToCloudinary = require('../utils/uploadToCloudinary')




   // GET ALL COLLEGE STUDENTS

 exports.getCollegeStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 21; // default 15
    const total = await Student.countDocuments();

    const query = Student.find().sort({ createdAt: 1 });
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
};


   // GET SINGLE STUDENT

exports.getSingleCollegeStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


  // CREATE STUDENT (image) cloiud folder = college_students

exports.createCollegeStudent = async (req, res, next) => {
  try {
    let imageUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'college_students')
      imageUrl = result.secure_url;
    }

    const student = new Student({ ...req.body, image: imageUrl, educationLevel: 'College' });
    const savedStudent = await student.save();
    res.json({ success: true, data: savedStudent });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


   // UPDATE STUDENT

exports.updateCollegeStudent = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'college_students')
      updateData.image = result.secure_url;
    }
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedStudent) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, data: updatedStudent });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


   // DELETE STUDENT

exports.deleteCollegeStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
