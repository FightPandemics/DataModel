var thread = new Schema({
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
    status: {
        type: String,
        default: "pending",
        enum: [
            "blocked",
            "accepted",
            "pending",
            "archived"
        ],
        required: true
    },
    participants: [
        new Schema({
            id: {
                type: Schema.Types.ObjectId,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            newMessages: {
                type: Boolean,
                default: false,
                required: true
            },
            lastAccess: {
                type: Date,
                required: true
            },
            photo: {
                type: String
            }
        })
    ]
});