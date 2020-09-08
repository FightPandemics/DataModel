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
                "author",
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