const { Schema, model } = require("mongoose");
const { schema: locationSchema } = require("./location");

const feedbackSchema = new Schema(
  {
    _id: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    age: Number,
    covidImpact: String,
    generalFeedback: String,
    ipAddress: {
      required: true,
      type: String,
    },
    location: locationSchema,
    mostValuableFeature: String,
    rating: {
      max: 5,
      min: 1,
      required: true,
      type: Number,
    },
    userId: {
      ref: "IndividualUser",
      type: Schema.Types.ObjectId,
    },
    whatWouldChange: {
      type: String,
    },
  },
  { collection: "feedbacks", timestamps: true },
);

// -- Model
const Feedback = model("Feedback", feedbackSchema);

exports.schema = feedbackSchema;
exports.model = Feedback;
