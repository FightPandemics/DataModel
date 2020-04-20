// -- Imports
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const authorSchema = require("./author");

// -- Schema
var commentSchema = new Schema({
    author: authorSchema,
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true

    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    likes: {
        // TODO: how to guarantee unique ids?
        type: [mongoose.ObjectId],
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
    createdAt: 1
})

// Index for parent comment's foreign key for lookup performance
commentSchema.index({'parenId': 1})

// Index for author's foreign key for lookup performance
commentSchema.index({'author.authorId': 1})

// Index for like's foreign key for lookup performance
commentSchema.index({'likes': 1})

// -- Model
var Comment = mongoose.model('Comment', commentSchema)

// -- Export
module.exports = commentSchema, Comment
