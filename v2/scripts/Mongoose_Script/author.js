// -- Imports
const mongoose = require("mongoose")
const locationSchema = require("./location").schema

// -- Schema
var authorSchema = new mongoose.Schema({
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

// -- Model
var Author = mongoose.model('Author', authorSchema)

exports.schema = authorSchema
exports.model = Author