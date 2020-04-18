use applicationDB;

db.createCollection( "PostSchema",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "PostSchema",
            "additionalProperties": false,
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "androidUrl": {
                    "bsonType": "string"
                },
                "authorId": {
                    "bsonType": "objectId"
                },
                "comments": {
                    "bsonType": "object",
                    "properties": {
                        "type": {
                            "bsonType": "array",
                            "additionalItems": true,
                            "uniqueItems": false,
                            "items": {
                                "bsonType": "object",
                                "additionalProperties": false
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "commentsCount": {
                    "bsonType": "number"
                },
                "description": {
                    "bsonType": "string"
                },
                "iosUrl": {
                    "bsonType": "string"
                },
                "language": {
                    "bsonType": "array",
                    "additionalItems": true,
                    "uniqueItems": false,
                    "items": {
                        "bsonType": "string"
                    }
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
                "looking": {
                    "bsonType": "object",
                    "properties": {
                        "type": {
                            "bsonType": "array",
                            "additionalItems": true,
                            "uniqueItems": false,
                            "items": {
                                "bsonType": "string"
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "media": {
                    "bsonType": "string"
                },
                "needs": {
                    "bsonType": "object",
                    "properties": {
                        "type": {
                            "bsonType": "array",
                            "additionalItems": true,
                            "uniqueItems": false,
                            "items": {
                                "bsonType": "string"
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "postEmail": {
                    "bsonType": "string"
                },
                "shareWith": {
                    "bsonType": "object",
                    "properties": {
                        "type": {
                            "bsonType": "array",
                            "additionalItems": true,
                            "uniqueItems": false,
                            "items": {
                                "bsonType": "string"
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "status": {
                    "bsonType": "bool"
                },
                "tags": {
                    "bsonType": "array",
                    "additionalItems": true,
                    "uniqueItems": false,
                    "items": {
                        "bsonType": "string"
                    }
                },
                "title": {
                    "bsonType": "string"
                },
                "type": {
                    "bsonType": "object",
                    "properties": {
                        "type": {
                            "bsonType": "array",
                            "additionalItems": true,
                            "uniqueItems": false,
                            "items": {
                                "bsonType": "string"
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "website": {
                    "bsonType": "string"
                }
            },
            "required": [
                "_id",
                "authorId",
                "description",
                "title"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});