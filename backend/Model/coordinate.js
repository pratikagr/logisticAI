const mongoose = require('mongoose');

const CoordinateSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        trim: true,
        required: false
    },
    founded: {
        type: String,
        required: false
    },
    abbreviation: {
        type: String,
        trim: true,
        required: false
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Coordinate', CoordinateSchema);