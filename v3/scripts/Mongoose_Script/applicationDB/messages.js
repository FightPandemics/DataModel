var messages = new Schema({
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
    authorId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    threadId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        default: "sent",
        enum: [
            "edited",
            "deleted",
            "sent"
        ],
        required: true
    },
    postRef: postRef
});