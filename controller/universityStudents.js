const Student = require('../models/universityStudents');
const uploadToCloudinary = require('../utils/uploadToCloudinary')




   // Get all university students

exports.getAllUniversityStudents =  async (req, res, next) => {
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


exports.getSingleUniversityStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


  // create Student 'image'

exports.createUniversityStudent = async (req, res, next) => {
  try {
    let imageUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'university_students')
      imageUrl = result.secure_url;
    }

    const student = new Student({ ...req.body, image: imageUrl, educationLevel: 'University' });
    const savedStudent = await student.save();
    res.json({ success: true, data: savedStudent });
    console.log(req.body)
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


   // updateUniversityStudent

exports.updateUniversityStudent = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
     const result = await uploadToCloudinary(req.file.buffer, 'university_students')
      updateData.image = result.secure_url;
    }
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedStudent) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, data: updatedStudent });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


   // delete Students

exports.deleteUniversityStudent = async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

