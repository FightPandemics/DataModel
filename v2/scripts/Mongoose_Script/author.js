// -- Imports
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const LocationSchema = require("./location");

// -- Schema
var authorSchema = new Schema({
    authorId: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    authorType: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: [
            "company",
            "community",
            "government",
            "health care provider",
            "individual",
            "non-profit",
            "other",
            "r&D",
            "startup",
            "university"
        ]
    },
    location: locationSchema
})

// -- Exports
module.exports = authorSchema