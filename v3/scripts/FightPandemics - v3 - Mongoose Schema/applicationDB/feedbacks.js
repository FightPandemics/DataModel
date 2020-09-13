var feedbacks = new Schema({
    createdAt: {
        type: Date,
        required: true
    },
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    mostValuableFeature: {
        type: String
    },
    whatWouldChange: {
        type: String
    },
    generalFeedback: {
        type: String
    },
    covidImpact: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId
    },
    location: location
});