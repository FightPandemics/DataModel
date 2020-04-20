// -- Imports
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const model = mongoose.model
const ObjectId = mongoose.ObjectId
const authorSchema = require("./author").schema

// -- Schema
var commentSchema = new Schema({
    author: authorSchema,
    postId: {
        type: ObjectId,
        ref: 'Post',
        required: true

    },
    parentId: {
        type: ObjectId,
        ref: 'Comment'
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    likes: {
        // TODO: how to guarantee unique ids?
        type: [ObjectId],
        ref: "User",
        default: []
    },
}, { collection: 'comments', timestamps: true });

// -- Indexes
// Indexes for displaying comment tree of a post, also servers as post's foreign
// key index
commentSchema.index({
    postId: 1,
    parentId: 1,
    createdAt: -1
})

// Index for parent comment's foreign key for lookup performance
commentSchema.index({'parentId': 1, createdAt: -1})

// Index for author's foreign key for lookup performance
commentSchema.index({'author.authorId': 1, createdAt: -1})

// Index for like's foreign key for lookup performance
commentSchema.index({'likes': 1})

// -- Model
var Comment = model('Comment', commentSchema)

exports.schema = commentSchema
exports.model = Comment
