const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
    image: {
        type: String, // optional
    },
    text: {
        type: String, // optional
    }
});

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the news post']
    },
    sections: {
        type: [SectionSchema], // array of sections
        default: [] // optional, can be empty
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('News', NewsSchema);