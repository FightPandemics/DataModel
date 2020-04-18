use applicationDB;

db.createCollection( "organizations",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "organizations",
            "additionalProperties": false,
            "properties": {
                "_id": {
                    "bsonType": "objectId",
                    "description": "Automatically generated _id."
                },
                "ownerId": {
                    "bsonType": "objectId",
                    "description": "_id of the user who owns the organization."
                },
                "name": {
                    "bsonType": "string",
                    "description": "Organization's name.\n"
                },
                "description": {
                    "bsonType": "string",
                    "description": "Small description of the organization (limited to 100 char)."
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
                "global": {
                    "bsonType": "bool",
                    "description": "Flag to indicate wheter this organization is global."
                },
                "urls": {
                    "bsonType": "object",
                    "description": "Document holding external urls and refs to the organization such as social media profiles.",
                    "properties": {
                        "linkedin": {
                            "bsonType": "string",
                            "description": "URL to organization's Linkedin page."
                        },
                        "twitter": {
                            "bsonType": "string",
                            "description": "URL to organization's Twitter page."
                        },
                        "website": {
                            "bsonType": "string",
                            "description": "URL to organization's website."
                        },
                        "playstore": {
                            "bsonType": "string",
                            "description": "URL to organization's page at Google Play Store."
                        },
                        "appstore": {
                            "bsonType": "string",
                            "description": "URL to organization's page at Apple App Store"
                        }
                    },
                    "additionalProperties": false
                },
                "photo": {
                    "bsonType": "string",
                    "description": "URI with the location of the profile's photo."
                },
                "email": {
                    "bsonType": "string",
                    "description": "Organization's email"
                },
                "type": {
                    "bsonType": "string",
                    "description": "The type of the organization. Can be: Community, Government, Health care provider, Non-profit, Other, R&D, Startup, Traditional Company and University. All names are store in lowercase only.",
                    "enum": [
                        "startup",
                        "traditional company",
                        "community",
                        "government",
                        "r&d",
                        "non-profit",
                        "university",
                        "health care provider",
                        "other"
                    ]
                },
                "industry": {
                    "bsonType": "string",
                    "description": "Industry from which the organization participates. Plan is for this values to be scraped from linkedin industries."
                },
                "language": {
                    "bsonType": "string",
                    "description": "Field to inidicate the language used by the organization."
                },
                "objectives": {
                    "bsonType": "object",
                    "description": "Document with what are the objectives of the organization through the application, such as finding volunteers, staff, investors and donors.",
                    "properties": {
                        "volunteers": {
                            "bsonType": "bool",
                            "description": "Flag to indicate wheter the organization is seeking volunteers through the app."
                        },
                        "donations": {
                            "bsonType": "bool",
                            "description": "Flag to indicate wheter the organization is seeking donations through the app."
                        },
                        "staff": {
                            "bsonType": "bool",
                            "description": "Flag to indicate wheter the organization is seeking staff through the app."
                        },
                        "other": {
                            "bsonType": "bool",
                            "description": "Flag to indicate wheter the organization is seeking other needs through the app."
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "volunteers",
                        "donations",
                        "staff",
                        "other"
                    ]
                }
            },
            "required": [
                "_id",
                "ownerId",
                "name",
                "email",
                "type",
                "industry",
                "objectives"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});