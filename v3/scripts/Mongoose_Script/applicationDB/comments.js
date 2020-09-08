var comments = new Schema({
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
    author: author,
    postId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    parentId: {
        type: Schema.Types.ObjectId
    },
    content: {
        type: String,
        required: true
    },
    likes: [
        {
            type: Schema.Types.ObjectId
        }
    ]
});