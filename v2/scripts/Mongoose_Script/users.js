// -- Imports
import { Schema as _Schema, model } from 'mongoose';
import locationSchema from "./location";

// -- Schema
var userSchema = new _Schema({
    authId: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validator: function(email) {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        }
    },
    location: locationSchema,
    about: { type: String, trim: true, maxLength: 100 },
    photo: String
}, { collection: 'users', timestamps: true });

// -- Indexes
userSchema.index({
    type: 1,
    ownerId: 1,
    createdAt: -1
})

// Index for author's foreign key for lookup performance
postSchema.index({'author.authorId': 1, createdAt: -1})


// -- Model
var User = model('User', userSchema)

export const schema = userSchema
export const user = User
