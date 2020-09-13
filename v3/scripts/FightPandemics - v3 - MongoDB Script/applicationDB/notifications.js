use applicationDB;

db.createCollection( "notifications",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "notifications",
            "additionalProperties": true,
            "properties": {
                "_id": {
                    "bsonType": "objectId",
                    "description": "Automatically generated object_id as primary key."
                },
                "createdAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the notification's creation date"
                },
                "updatedAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the notification's last update date"
                },
                "sentAt": {
                    "bsonType": "date",
                    "description": "Timestamp of when the notification was sent "
                },
                "seenAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the time the notification was seen by the user"
                },
                "sender": {
                    "bsonType": "object",
                    "description": "Document with the user the info from the user that triggered the notification",
                    "properties": {
                        "id": {
                            "bsonType": "objectId",
                            "description": "Foreign key to the user who created the post."
                        },
                        "name": {
                            "bsonType": "string",
                            "description": "Sender user's name"
                        },
                        "type": {
                            "bsonType": "string",
                            "description": "Sender user's type"
                        },
                        "photo": {
                            "bsonType": "string",
                            "description": "Sender user's photo url"
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "id",
                        "name",
                        "type"
                    ]
                },
                "receiver": {
                    "bsonType": "object",
                    "description": "Document with the user the info from the user that is receivin the notification",
                    "properties": {
                        "id": {
                            "bsonType": "objectId",
                            "description": "Foreign key to the user who created the post."
                        },
                        "name": {
                            "bsonType": "string",
                            "description": "Receiver user's name\n"
                        },
                        "type": {
                            "bsonType": "string",
                            "description": "Receiver user's type"
                        },
                        "photo": {
                            "bsonType": "string",
                            "description": "Receiver user's photo url"
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "id",
                        "name",
                        "type"
                    ]
                }
            },
            "oneOf": [
                {
                    "bsonType": "object",
                    "description": "Notification about a post you created",
                    "properties": {
                        "postId": {
                            "bsonType": "objectId"
                        },
                        "type": {
                            "bsonType": "string",
                            "description": "Type of notification",
                            "pattern": "post"
                        },
                        "action": {
                            "bsonType": "string",
                            "description": "Type of action that triggered the notification",
                            "enum": [
                                "comment",
                                "like",
                                "share"
                            ]
                        }
                    },
                    "additionalProperties": true,
                    "required": [
                        "postId",
                        "type",
                        "action"
                    ]
                },
                {
                    "bsonType": "object",
                    "description": "Notification about a comment you created",
                    "properties": {
                        "commentId": {
                            "bsonType": "objectId",
                            "description": "ID of the comment where the notification was triggered"
                        },
                        "type": {
                            "bsonType": "string",
                            "description": "Type of notification",
                            "pattern": "comment"
                        },
                        "action": {
                            "bsonType": "string",
                            "description": "Type of action that triggered the notification",
                            "enum": [
                                "comment",
                                "like"
                            ]
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "commentId",
                        "type",
                        "action"
                    ]
                },
                {
                    "bsonType": "object",
                    "description": "Notification about private messages",
                    "properties": {
                        "threadId": {
                            "bsonType": "objectId",
                            "description": "ObjectId of the Thread that has new messages"
                        },
                        "type": {
                            "bsonType": "string",
                            "description": "Type of notification",
                            "pattern": "message"
                        },
                        "action": {
                            "bsonType": "string",
                            "description": "Type of action that triggered the notification",
                            "enum": [
                                "message"
                            ]
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "threadId",
                        "type",
                        "action"
                    ]
                },
                {
                    "bsonType": "object",
                    "description": "Notification about a organization you manage",
                    "properties": {
                        "organizationId": {
                            "bsonType": "objectId",
                            "description": "ObjectId of the organization the action is about"
                        },
                        "type": {
                            "bsonType": "string",
                            "description": "Type of notification",
                            "pattern": "organization"
                        },
                        "action": {
                            "bsonType": "string",
                            "description": "Type of action that triggered the notification",
                            "enum": [
                                "join"
                            ]
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "organizationId",
                        "type",
                        "action"
                    ]
                }
            ],
            "required": [
                "_id",
                "createdAt",
                "updatedAt",
                "sender",
                "receiver"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});