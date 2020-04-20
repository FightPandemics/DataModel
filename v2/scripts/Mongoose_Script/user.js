// -- Imports
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const model = mongoose.model
const locationSchema = require("./location").schema

// -- Schema
var userSchema = new Schema({
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
    const Post = require("./post").model
    const Comment = require("./comment").model

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


// -- Model
var User = model('User', userSchema)

exports.schema = userSchema
exports.model = User
