var users = new Schema({
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
    authId: {
        type: String,
        required: true
    },
    location: location,
    about: {
        type: String
    },
    photo: {
        type: String
    }
});