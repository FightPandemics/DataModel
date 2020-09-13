var postRef = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    objective: {
        type: String,
        enum: [
            "request",
            "offer"
        ],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: author
});