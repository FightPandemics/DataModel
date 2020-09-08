var posts = new Schema({
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
    expireAt: {
        type: Date
    },
    author: author,
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
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
    visibility: {
        type: String,
        enum: [
            "zipcode",
            "state",
            "country",
            "worldwide"
        ],
        required: true
    },
    likes: [
        {
            type: Schema.Types.ObjectId
        }
    ],
    types: [
        {
            type: String,
            enum: [
                "Medical Supplies",
                "Groceries/Food",
                "Business",
                "Education",
                "Legal",
                "Wellbeing/Mental",
                "Entertainment",
                "Information",
                "Funding",
                "R&D",
                "Others"
            ]
        }
    ],
    language: [
        {
            type: String
        }
    ],
    externalLinks: new Schema({
        email: {
            type: String
        },
        website: {
            type: String
        },
        playStore: {
            type: String
        },
        appStore: {
            type: String
        }
    })
});