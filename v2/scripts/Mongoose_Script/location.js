// -- Imports
import { Schema as _Schema, model } from 'mongoose';

// - Schema
var locationSchema = new _Schema({
    coordinates: {
        type: [Number],
        required: true,
        validate: {
            // Array must have two coordinates, with valid lng and lat values
            validator : function(array) {
                if (array[0].length != 2) return false
                if (array[0] > 180 || array[0] < -180) return false
                if (array[1] > 90 || array[0] < -90) return false

                return true
            }
        }
    },
    type: {
        type: String,
        required: true,
        enum: ["Point"]
    },
    country: {
        type: String,
        lowercase: true,
        trim: true
    },
    city: {
        type: String,
        lowercase: true,
        trim: true
    },
    neighborhood: {
        type: String,
        lowercase: true,
        trim: true
    },
    address: {
        type: String,
        lowercase: true,
        trim: true
    },
})

// -- Model
var Location = model('Location', locationSchema)

export const schema = locationSchema
export const model = Location