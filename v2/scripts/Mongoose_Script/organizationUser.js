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
        ]
    },
    industry: { type: String, required: true },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'IndividualUser',
        required: true
    },
    name: { type:String, required: true },
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

// -- Indexes


// -- Model
var OrganizationUser = userSchema.discriminator(
    'OrganizationUser', organizationSchema
);

export const schema = organizationSchema
export const model = OrganizationUser
