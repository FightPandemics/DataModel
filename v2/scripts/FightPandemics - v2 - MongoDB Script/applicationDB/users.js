use applicationDB;

db.createCollection( "users",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "users",
            "additionalProperties": true,
            "properties": {
                "_id": {
                    "bsonType": "objectId",
                    "description": "Automatically generated _it as primary key."
                },
                "createdAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the user's creation date"
                },
                "updatedAt": {
                    "bsonType": "date",
                    "description": "Timestamp indicating last update on the database."
                },
                "email": {
                    "bsonType": "string",
                    "description": "User's email validated by a regex pattern."
                },
                "accessToken": {
                    "bsonType": "string",
                    "description": "User's acess token. Shouldn't be required?"
                },
                "firstName": {
                    "bsonType": "string",
                    "description": "The first name of the user"
                },
                "lastName": {
                    "bsonType": "string",
                    "description": "The last name of the user. Optional field."
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
                "needs": {
                    "bsonType": "object",
                    "description": "User's need in the app, representing what kind of help he/she needs",
                    "properties": {
                        "medicalHelp": {
                            "bsonType": "bool",
                            "description": "Flag to indicate wheter the user needs medical help. \nMarking this indicates he shows symptoms of COVID-19."
                        },
                        "otherHelp": {
                            "bsonType": "bool",
                            "description": "Flag to indicate wheter the user needs non-medical help, such as getting groceries, medice and etc.."
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "medicalHelp",
                        "otherHelp"
                    ]
                },
                "objectives": {
                    "bsonType": "object",
                    "description": "Document with what are the objectives of the user through the application, such as donating, volunteering or sharing information.",
                    "properties": {
                        "volunteer": {
                            "bsonType": "bool",
                            "description": "Flag to indicate wheter the user wants to volunteer for iniciatives through the app."
                        },
                        "donate": {
                            "bsonType": "bool",
                            "description": "Flag to indicate wheter the user wants to donate for iniciatives through the app."
                        },
                        "shareInformation": {
                            "bsonType": "bool",
                            "description": "Flag to indicate wheter the user wants to share information through the app."
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "volunteer",
                        "donate",
                        "shareInformation"
                    ]
                },
                "photo": {
                    "bsonType": "string",
                    "description": "URI with the location of the profile's photo."
                },
                "urls": {
                    "bsonType": "object",
                    "description": "Document holding the user urls to external websites and social networks",
                    "properties": {
                        "facebookURL": {
                            "bsonType": "string",
                            "description": "URL to user's Facebook page."
                        },
                        "linkedinURL": {
                            "bsonType": "string",
                            "description": "URL to user's Linkedin page."
                        },
                        "twitterURL": {
                            "bsonType": "string",
                            "description": "URL to user's Twitter page."
                        },
                        "githubURL": {
                            "bsonType": "string",
                            "description": "URL to user's Github page."
                        },
                        "websiteURL": {
                            "bsonType": "string",
                            "description": "URL to user's personal website."
                        }
                    },
                    "additionalProperties": false
                },
                "about": {
                    "bsonType": "string",
                    "description": "Small self-introduction, limited to 100 char"
                }
            },
            "required": [
                "createdAt",
                "updatedAt",
                "email",
                "firstName",
                "_id",
                "needs"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});