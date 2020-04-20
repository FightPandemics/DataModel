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
    firstName: { type: String, required: true },
    lastName: String,
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

// -- Indexes


// -- Model
var IndividualUser = userSchema.discriminator(
    'IndividualUser', individualUserSchema
);

export const schema = individualUserSchema
export const model = IndividualUser
