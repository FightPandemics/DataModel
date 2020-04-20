// -- Imports
import { Schema as _Schema } from 'mongoose';
var Schema = _Schema;

import { schema as userSchema } from "./user";

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
    import { Post as Post } from "./post";
    import { Comment as Comment } from "./comment";

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
    import { Post as Post } from "./post";
    import { Comment as Comment } from "./comment";

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
var OrganizationUser = userSchema.discriminator(
    'OrganizationUser', organizationSchema
);

export const schema = organizationSchema
export const model = OrganizationUser
