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

// -- Methods
userSchema.path("location", {
    set: updateAuthorLocationReference
})
function updateAuthorLocationReference(location) {
    import { Post as Post } from "./post";
    import { Comment as Comment } from "./comment";

    this.location = location

    Post.where(
        { "author.authorId": this._id },
        { "$set": { "author.location": this.location } }
    )
    Comment.where(
        {"author.authorId": this._id },
        { "$set": { "author.location": this.location } }
    )
}

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
