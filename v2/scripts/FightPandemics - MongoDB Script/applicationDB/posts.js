use applicationDB;

db.createCollection( "posts",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "posts",
            "description": "Document to represent a post, asking or offering help to be displayed on the feed",
            "additionalProperties": false,
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "createdAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the post's creation date"
                },
                "updatedAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the post's last update date"
                },
                "expireAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the date the post will expire.\nIf no expiration date is present, the post does not expire."
                },
                "author": {
                    "bsonType": "object",
                    "properties": {
                        "authorId": {
                            "bsonType": "objectId",
                            "description": "Foreign key to the user who created the post."
                        },
                        "authorName": {
                            "bsonType": "string"
                        },
                        "authorType": {
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
                        "authorId",
                        "authorName",
                        "authorType"
                    ]
                },
                "title": {
                    "bsonType": "string",
                    "description": "The post title."
                },
                "description": {
                    "bsonType": "string",
                    "description": "String for the post content."
                },
                "status": {
                    "bsonType": "bool"
                },
                "objective": {
                    "bsonType": "string",
                    "description": "Field to indicate the post's objective.\nCurrently only two values allowed: \"offering help\" and \"looking for help\".",
                    "enum": [
                        "request",
                        "offer"
                    ]
                },
                "visibility": {
                    "bsonType": "string",
                    "description": "Field to specify the post's visibility. It can be: worldwide, country, state and zipcode.",
                    "enum": [
                        "zipcode",
                        "state",
                        "country",
                        "worldwide"
                    ]
                },
                "likes": {
                    "bsonType": "array",
                    "description": "Array holding the user_id of all the users who liked the post.",
                    "additionalItems": true,
                    "uniqueItems": true,
                    "items": {
                        "bsonType": "objectId",
                        "description": "_id of the user who liked the post"
                    }
                },
                "types": {
                    "bsonType": "array",
                    "description": "Array with the post's tags.\nCan be: Medical Supplies, Groceries/Food, Business, Education, Legal, Wellbeing/Mental, Entertainment, Information, Funding, R&D and Others",
                    "additionalItems": true,
                    "uniqueItems": false,
                    "items": {
                        "bsonType": "string",
                        "enum": [
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
                "language": {
                    "bsonType": "array",
                    "additionalItems": true,
                    "uniqueItems": false,
                    "items": {
                        "bsonType": "string"
                    }
                },
                "external_links": {
                    "bsonType": "object",
                    "properties": {
                        "email": {
                            "bsonType": "string"
                        },
                        "websiteURL": {
                            "bsonType": "string"
                        },
                        "playStoreURL": {
                            "bsonType": "string"
                        },
                        "appStoreURL": {
                            "bsonType": "string"
                        }
                    },
                    "additionalProperties": false
                }
            },
            "required": [
                "_id",
                "createdAt",
                "updatedAt",
                "author",
                "title",
                "description",
                "objective",
                "visibility"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});