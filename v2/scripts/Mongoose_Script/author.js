// -- Imports
import { Schema as _Schema, ObjectId, model } from 'mongoose';
import { schema as locationSchema } from "./location";

// -- Schema
var authorSchema = new _Schema({
    authorId: {
        type: ObjectId,
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
var Author = model('Author', authorSchema)

export const schema = authorSchema
export const model = Author