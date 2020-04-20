// -- Imports
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const model = mongoose.model
const ObjectId = mongoose.ObjectId
const authorSchema = require("./author").schema

// -- Schema
var postSchema = new Schema({
    expireAt: {
        type: Date
    },
    author: authorSchema,
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    objective: {
        type: String,
        lowercase: true,
        trim: true,
        enum: [
            "request",
            "offer"
        ]
    },
    visibility: {
        type: String,
        lowercase: true,
        trim: true,
        enum: [
            "zipcode",
            "state",
            "country",
            "worldwide"
        ]
    },
    likes: {
        // TODO: how to guarantee unique ids?
        type: [ObjectId],
        ref: "User",
        default: []
    },
    types: {
        type: [String],
        lowercase: true,
        trim: true,
        enum: [
            "business",
            "education",
            "entertainment",
            "funding",
            "groceries/food",
            "information",
            "legal",
            "medical supplies",
            "r&d",
            "others",
            "wellbeing/mental"
        ]
    },
    language: [String],
    externalLinks: {
        email: String,
        website: String,
        playStore: String,
        appStore: String
    }
}, { collection: 'posts', timestamps: true })

// -- Indexes
// Indexes for filtered feed
postSchema.index({
    // Expiration Filter
    expireAt: -1,
    // Location filter
    "location.country": 1,
    "location.state": 1,
    "location.city": 1,
    "location.neighborhood": 1,
    // Author type filter
    "author.authorType": 1,
    // Post type filter
    types: 1,
    // Objective filter
    objective: 1,
    // Simple most recent sorting
    createdAt: -1
})
postSchema.index({
    // Expiration Filter
    expireAt: -1,
    // Location filter
    "location.country": 1,
    "location.state": 1,
    "location.city": 1,
    // Author type filter
    "author.authorType": 1,
    // Post type filter
    types: 1,
    // Objective filter
    objective: 1,
    // Simple most recent sorting
    createdAt: -1
})
postSchema.index({
    // Expiration Filter
    expireAt: -1,
    // Location filter
    "location.country": 1,
    "location.state": 1,
    // Author type filter
    "author.authorType": 1,
    // Post type filter
    types: 1,
    // Objective filter
    objective: 1,
    // Simple most recent sorting
    createdAt: -1
})
postSchema.index({
    // Expiration Filter
    expireAt: -1,
    // Location filter
    "location.country": 1,
    // Author type filter
    "author.authorType": 1,
    // Post type filter
    types: 1,
    // Objective filter
    objective: 1,
    // Simple most recent sorting
    createdAt: -1
})
postSchema.index({
    // Expiration Filter
    expireAt: -1,
    // No Location filter
    // Author type filter
    "author.authorType": 1,
    // Post type filter
    types: 1,
    // Objective filter
    objective: 1,
    // Simple most recent sorting
    createdAt: -1
})

// Index for author's foreign key for lookup performance
postSchema.index({'author.authorId': 1, createdAt: -1})

// Index for like's foreign key for lookup performance
postSchema.index({'likes': 1})

// -- Model
var Post = model('Post', postSchema)

exports.schema = postSchema
exports.model = Post