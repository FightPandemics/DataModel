// -- Imports
const { Schema, model } = require("mongoose");

// - Schema
const locationSchema = new Schema({
  address: {
    lowercase: true,
    trim: true,
    type: String,
  },
  city: {
    lowercase: true,
    trim: true,
    type: String,
  },
  coordinates: {
    required: true,
    type: [Number],
    validate: {
      // Array must have two coordinates, with valid lng and lat values
      validator(array) {
        if (array[0].length !== 2) return false;
        if (array[0] > 180 || array[0] < -180) return false;
        if (array[1] > 90 || array[0] < -90) return false;

        return true;
      },
    },
  },
  country: {
    lowercase: true,
    trim: true,
    type: String,
  },
  neighborhood: {
    lowercase: true,
    trim: true,
    type: String,
  },
  type: {
    default: "Point",
    enum: ["Point"],
    required: true,
    type: String,
  },
});

// -- Model
const Location = model("Location", locationSchema);

// -- Export
exports.schema = locationSchema;
exports.model = Location;
