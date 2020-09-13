use applicationDB;

db.createCollection( "thread",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "thread",
            "description": "ObjectId that serves as primary key for the message thread.",
            "additionalProperties": false,
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "createdAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the threads's creation date"
                },
                "updatedAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the thread's update date"
                },
                "status": {
                    "bsonType": "string",
                    "description": "Curerent thread status, used to define archives, soft deletes and other conversation status. The statuses are:\n\n* **pending**: if the user didn't accept the message request yet\n* **blocked**: if the one of the user's blocked the other\n* **accepted**: message request was accepted and users exchange messages\n* **archived**: user archived the message thread\n",
                    "enum": [
                        "blocked",
                        "accepted",
                        "pending",
                        "archived"
                    ]
                },
                "participants": {
                    "bsonType": "array",
                    "description": "Array of user reference's, containing the participants of the message thread.\n\nIt is modelled as an array to allow expansion to group chats in the future.",
                    "additionalItems": true,
                    "minItems": 2,
                    "uniqueItems": false,
                    "items": {
                        "bsonType": "object",
                        "properties": {
                            "id": {
                                "bsonType": "objectId",
                                "description": "Foreign key to the user who created the post."
                            },
                            "name": {
                                "bsonType": "string",
                                "description": "User's name"
                            },
                            "type": {
                                "bsonType": "string",
                                "description": "User's type"
                            },
                            "newMessages": {
                                "bsonType": "bool",
                                "description": "Flag to indicate whether there are new messages since last time the user accessed the thread."
                            },
                            "lastAccess": {
                                "bsonType": "date",
                                "description": "Timestamp with the last time the user accessed the message thread."
                            },
                            "photo": {
                                "bsonType": "string",
                                "description": "URL with the user photo"
                            }
                        },
                        "additionalProperties": false,
                        "required": [
                            "id",
                            "name",
                            "type",
                            "newMessages",
                            "lastAccess"
                        ]
                    }
                }
            },
            "required": [
                "_id",
                "createdAt",
                "updatedAt",
                "status",
                "participants"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});