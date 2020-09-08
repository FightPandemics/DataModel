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
                    "description": "Curerent thread status, used to define archives, soft deletes and other conversation status. The statuses are:\n\n* **pending**: if the user didn't accept the message request yet\n* **blocked**: if the one of the user's blocked the other\n* **accepted**: message request was accepted and users exchange messages\n* **archived**: user archived the message thread\n* **deleted**: user deleted the conversation",
                    "enum": [
                        "deleted",
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
                            },
                            "newMessages": {
                                "bsonType": "bool",
                                "description": "Flag to indicate whether there are new messages since last time the user accessed the thread."
                            },
                            "lastAccess": {
                                "bsonType": "date",
                                "description": "Timestamp with the last time the user accessed the message thread."
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