const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db'); // Connects to MongoDB

const {
newsDetails
} = require('./controller/newsDetails')


const app = express();
const port = process.env.PORT || 5000;


// routers 
const newsRouter = require('./router/news');
const universityRouter = require('./router/universityStudents');
const collegeRouter = require('./router/collegeStudents');
const achievementRouter = require('./router/achievements')

// Connect to MongoDB
connectDB();

// for link preview on whatsap and facebook
app.get('/newsDetails.html', newsDetails)

// Static folder
app.use(express.static(path.join(__dirname, './public'),
{ extensions: ['html']
}));

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

// Mount news router
app.use('/api/news', newsRouter);

// Mount  University students router
app.use('/api/university-students', universityRouter);

// Mount  College students router
app.use('/api/college-students', collegeRouter);

// Mount  Achievemtns  router
app.use('/api/achievements', achievementRouter)

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));