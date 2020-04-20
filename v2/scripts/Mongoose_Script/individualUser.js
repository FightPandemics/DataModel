// -- Imports
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require("./user").model

// -- Schema
var individualUserSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["individual"]
    },
    firstName: {
        type: String,
        required: true,
        set: updateAuthorFirstNameReferences
    },
    lastName: {
        type: String,
        set: updateAuthorLastNameReferences
    },
    needs: {
        medicalHelp: { type: Boolean, required: true, default: false },
        otherHelp: { type: Boolean, required: true, default: false }
    },
    objectives: {
        donate: { type: Boolean, required: true, default: false },
        shareInformation: { type: Boolean, required: true, default: false },
        volunteer: { type: Boolean, required: true, default: false }
    },
    urls: {
        facebook: String,
        linkedin: String,
        twitter: String,
        github: String,
        website: String
    }
}, { collection: 'users' });

// -- Methods

function updateAuthorFirstNameReferences(firstName) {
    const Post = require("./post").model
    const Comment = require("./comment").model

    this.firstName = firstName

    Post.where(
        { "author.authorId": this._id },
        { "$set": { "author.authorName": this.fullName } }
    )
    Comment.where(
        { "author.authorId": this._id},
        { "$set": { "author.authorName": this.fullName } }
    )
}
function updateAuthorLastNameReferences(lastName) {
    const Post = require("./post").model
    const Comment = require("./comment").model

    this.lastName = lastName

    Post.where(
        { "author.authorId": this._id },
        { "$set": { "author.authorName": this.fullName } }
    )
    Comment.where(
        { "author.authorId": this._id},
        { "$set": { "author.authorName": this.fullName } }
    )
}

individualUserSchema.virtual('fullName').get(function () {
    return this.name.first + ' ' + this.name.last;
});

// -- Indexes


// -- Model
var IndividualUser = User.discriminator(
    'IndividualUser', individualUserSchema
);

exports.schema = individualUserSchema
exports.model = IndividualUser
