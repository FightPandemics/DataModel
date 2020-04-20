// -- Imports
import { Schema as _Schema } from 'mongoose';
import { schema as userSchema } from "./user";

// -- Schema
var individualUserSchema = new _Schema({
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
    import { Post as Post } from "./post";
    import { Comment as Comment } from "./comment";

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
    import { Post as Post } from "./post";
    import { Comment as Comment } from "./comment";

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
var IndividualUser = userSchema.discriminator(
    'IndividualUser', individualUserSchema
);

export const schema = individualUserSchema
export const model = IndividualUser
