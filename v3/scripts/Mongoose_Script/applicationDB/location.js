var location = new Schema({
    coordinates: [
        {
            type: Number,
            min: -180,
            max: 180,
            default: 0
        },
        {
            type: Number,
            min: -90,
            max: 90,
            default: 0
        }
    ],
    type: {
        type: String,
        enum: [
            "Point"
        ],
        required: true
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    neighborhood: {
        type: String
    },
    address: {
        type: String
    }
});