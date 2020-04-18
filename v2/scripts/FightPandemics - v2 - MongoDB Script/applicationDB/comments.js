use applicationDB;

db.createCollection( "comments",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "comments",
            "additionalProperties": false,
            "properties": {
                "_id": {
                    "bsonType": "objectId",
                    "description": "Automatically generated object_id as primary key."
                },
                "createdAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the comment's creation date"
                },
                "updatedAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the comment's last update date"
                },
                "authorId": {
                    "bsonType": "objectId",
                    "description": "Id of the user who created the comment."
                },
                "postId": {
                    "bsonType": "objectId"
                },
                "parentId": {
                    "bsonType": "objectId",
                    "description": "If the comment is nested (in another comment), this field will hold the _id of the parent comment. Optional field, where being blank means it is a root comment."
                },
                "content": {
                    "bsonType": "string",
                    "description": "Stirng holding the comment's content."
                },
                "likes": {
                    "bsonType": "array",
                    "description": "Array holding the user_id of all the users who liked the comment.",
                    "additionalItems": true,
                    "uniqueItems": true,
                    "items": {
                        "bsonType": "objectId",
                        "description": "_id of the user who liked the comment"
                    }
                }
            },
            "required": [
                "_id",
                "createdAt",
                "updatedAt",
                "authorId",
                "postId",
                "content"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});
db.comments.createIndex(
{
    "createdAt": 1,
    "parentId": 1,
    "postId": 1
},
{
    "name": "New Index"
}
);