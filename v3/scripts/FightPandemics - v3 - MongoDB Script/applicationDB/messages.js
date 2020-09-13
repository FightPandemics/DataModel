use applicationDB;

db.createCollection( "messages",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "messages",
            "description": "Message sent in a private conversation\n",
            "additionalProperties": false,
            "properties": {
                "_id": {
                    "bsonType": "objectId",
                    "description": "ObjectId used as primary key for a message"
                },
                "createdAt": {
                    "bsonType": "date",
                    "description": "Timestamp with message's creation date"
                },
                "updatedAt": {
                    "bsonType": "date",
                    "description": "Timestamp with message's update date"
                },
                "authorId": {
                    "bsonType": "objectId",
                    "description": "ObjectId of the user who sent the message"
                },
                "content": {
                    "bsonType": "string",
                    "description": "Messages content, containing html links and emojis "
                },
                "threadId": {
                    "bsonType": "objectId",
                    "description": "Reference to the thread were the message was sent"
                },
                "status": {
                    "bsonType": "string",
                    "description": "Curerent message status, used to define if it was edited or deleted:\n\n* **sent**: message was sent and not edited or deleted.\n* **edited**: message was edited by the author\n* **deleted**: message was deleted by the author",
                    "enum": [
                        "edited",
                        "deleted",
                        "sent"
                    ]
                },
                "postRef": {
                    "bsonType": "object",
                    "description": "Optional post reference, allowing a post to be referenced in a message thread.",
                    "properties": {
                        "id": {
                            "bsonType": "objectId"
                        },
                        "objective": {
                            "bsonType": "string",
                            "description": "Field to indicate the post's objective.\nCurrently only two values allowed: \"offering help\" and \"looking for help\".",
                            "enum": [
                                "request",
                                "offer"
                            ]
                        },
                        "title": {
                            "bsonType": "string",
                            "description": "The post title."
                        },
                        "content": {
                            "bsonType": "string",
                            "description": "String for the post content."
                        },
                        "author": {
                            "bsonType": "object",
                            "properties": {
                                "id": {
                                    "bsonType": "objectId",
                                    "description": "Foreign key to the user who created the post."
                                },
                                "name": {
                                    "bsonType": "string"
                                },
                                "type": {
                                    "bsonType": "string"
                                },
                                "location": {
                                    "bsonType": "object",
                                    "description": "Location document according to the norms of a [GeoJSON Object](https://docs.mongodb.com/manual/reference/geojson/ ).\nThe fields address, neighborhood, city, state and country are added to store the result of the geoprocessing.",
                                    "properties": {
                                        "coordinates": {
                                            "bsonType": "array",
                                            "description": "Array with the coordinates, specifying **longitude first** and **latitude second**, as default in the [GeoJSON](https://docs.mongodb.com/manual/reference/geojson/) definition.",
                                            "additionalItems": true,
                                            "minItems": 2,
                                            "maxItems": 2,
                                            "uniqueItems": false,
                                            "items": [
                                                {
                                                    "bsonType": "number",
                                                    "description": "Location longitude\n",
                                                    "minimum": -180,
                                                    "maximum": 180
                                                },
                                                {
                                                    "bsonType": "number",
                                                    "description": "Location latitude\n",
                                                    "minimum": -90,
                                                    "maximum": 90
                                                }
                                            ]
                                        },
                                        "type": {
                                            "bsonType": "string",
                                            "description": "Type of the GeoJSON Object.\nPlease refer to the [official documentation](https://docs.mongodb.com/manual/reference/geojson/ ) for more information.\n\n**In our case, the value will always be of the type \"Point\".**",
                                            "enum": [
                                                "Point"
                                            ]
                                        },
                                        "country": {
                                            "bsonType": "string",
                                            "description": "String holding the country's name.\n"
                                        },
                                        "city": {
                                            "bsonType": "string",
                                            "description": "String holding the city's name."
                                        },
                                        "neighborhood": {
                                            "bsonType": "string",
                                            "description": "String holding the neighborhood's name."
                                        },
                                        "address": {
                                            "bsonType": "string",
                                            "description": "String holding the address (street, number and other details)."
                                        }
                                    },
                                    "additionalProperties": false,
                                    "required": [
                                        "coordinates",
                                        "type"
                                    ]
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
                    "additionalProperties": false,
                    "required": [
                        "id",
                        "objective",
                        "title",
                        "content",
                        "author"
                    ]
                }
            },
            "required": [
                "_id",
                "createdAt",
                "updatedAt",
                "authorId",
                "content",
                "threadId",
                "status"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});