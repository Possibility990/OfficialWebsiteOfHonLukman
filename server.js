const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db'); // Connects to MongoDB

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Static folder
app.use(express.static(path.join(__dirname, './public')));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true
  })
);

// Routes
const newsRouter = require('./router/news');
app.use('/api/news', newsRouter);

// ✅ University students
const universityRouter = require('./router/universityStudents');
app.use('/api/university-students', universityRouter);

// ✅ College students
const collegeRouter = require('./router/collegeStudents');
app.use('/api/college-students', collegeRouter);

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));