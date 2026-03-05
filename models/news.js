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

    // ✅ NEW FIELD
    curiosityGap: {
        type: String,
        required: [true, 'Please provide a curiosity hook'],
        maxlength: [120, 'Curiosity hook cannot exceed 120 characters'],
        trim: true
    },

    sections: {
        type: [SectionSchema],
        default: []
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('News', NewsSchema);