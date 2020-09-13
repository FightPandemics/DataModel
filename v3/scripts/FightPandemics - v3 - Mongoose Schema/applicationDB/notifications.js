var notifications = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    sentAt: {
        type: Date
    },
    seenAt: {
        type: Date
    },
    sender: new Schema({
        id: {
            type: Schema.Types.ObjectId
        },
        name: {
            type: String
        },
        type: {
            type: String
        },
        photo: {
            type: String
        }
    }),
    receiver: new Schema({
        id: {
            type: Schema.Types.ObjectId
        },
        name: {
            type: String
        },
        type: {
            type: String
        },
        photo: {
            type: String
        }
    })
});