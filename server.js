const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db'); // make sure this connects to your MongoDB

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();



// static folder
app.use(express.static(path.join(__dirname, './public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// give access to get from outside
app.use(
    cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials:true
}));

// Static folder for uploaded images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const newsRouter = require('./router/news');
app.use('/api/news', newsRouter);

// Home route
// app.get('/', (req, res) => {
//     res.json({ message: 'Welcome to the Random API page' });
// });

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));