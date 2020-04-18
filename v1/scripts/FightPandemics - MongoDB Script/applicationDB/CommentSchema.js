use applicationDB;

db.createCollection( "CommentSchema",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "CommentSchema",
            "additionalProperties": false,
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "authorId": {
                    "bsonType": "objectId"
                },
                "comment": {
                    "bsonType": "string"
                },
                "likes": {
                    "bsonType": "object",
                    "properties": {
                        "type": {
                            "bsonType": "array",
                            "additionalItems": true,
                            "uniqueItems": false,
                            "items": {
                                "bsonType": "objectId"
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "likesCount": {
                    "bsonType": "number"
                },
                "parentId": {
                    "bsonType": "objectId"
                },
                "postId": {
                    "bsonType": "objectId"
                },
                "childCount": {
                    "bsonType": "number"
                },
                "children": {
                    "bsonType": "array",
                    "additionalItems": true,
                    "uniqueItems": false,
                    "items": {
                        "bsonType": "objectId",
                        "description": "Array of embedded documents with nested comments."
                    }
                },
                "created_at": {
                    "bsonType": "date"
                },
                "updated_at": {
                    "bsonType": "date"
                }
            },
            "required": [
                "_id",
                "authorId",
                "comment",
                "postId",
                "created_at",
                "updated_at"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});
db.CommentSchema.createIndex(
{
    "created_at": 1,
    "parentId": 1,
    "postId": 1
},
{
    "name": "New Index"
}
);