// -- Imports
import { Schema as _Schema, ObjectId, model } from 'mongoose';
import { schema as authorSchema } from "./author";

// -- Schema
var commentSchema = new _Schema({
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

export const schema = commentSchema
export const model = Comment
