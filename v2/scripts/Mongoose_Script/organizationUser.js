// -- Imports
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require("./user").model

// -- Schema
var organizationSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: [
            "community",
            "government",
            "health care provider",
            "non-profit",
            "other",
            "r&d",
            "startup",
            "traditional company",
            "university"
        ],
        set: updateAuthorTypeReferences
    },
    industry: { type: String, required: true },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'IndividualUser',
        required: true
    },
    name: {
        type:String,
        required: true,
        set: updateAuthorNameReferences
    },
    needs: {
        donations: { type: Boolean, required: true, default: false },
        other: { type: Boolean, required: true, default: false },
        staff: { type: Boolean, required: true, default: false },
        volunteers: { type: Boolean, required: true, default: false }
    },
    global: Boolean,
    urls: {
        appStore: String,
        linkedin: String,
        playStore: String,
        twitter: String,
        website: String
    }
}, { collection: 'users' });

// -- Methods

function updateAuthorNameReferences(name) {
    const Post = require("./post").model
    const Comment = require("./comment").model

    this.name = name;

    Post.where(
        { "author.authorId": this._id },
        { "$set": { "author.authorName": this.name } }
    )
    Comment.where(
        { "author.authorId": this._id },
        { "$set": { "author.authorName": this.name } }
    )
}

function updateAuthorTypeReferences(type) {
    const Post = require("./post").model
    const Comment = require("./comment").model

    this.type = type;

    Post.where(
        { "author.authorId": this._id },
        { "$set": { "author.authorType": this.type } }
    )
    Comment.where(
        { "author.authorId": this._id },
        { "$set": { "author.authorType": this.type } }
    )
}


// -- Indexes


// -- Model
var OrganizationUser = User.discriminator(
    'OrganizationUser', organizationSchema
);

exports.schema = organizationSchema
exports.model = OrganizationUser
