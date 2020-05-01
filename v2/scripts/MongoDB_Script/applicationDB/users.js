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
            "description": "Collection that holds all the data on system's users. \n\nThe users can be of **two types**: **(1) Individual**, representing a private user account; and **(2) Organization**, representing an organization of various types.\n\nThe field 'type' is used to differentiate between the two subschemas, with 'individual' representing private user accounts and \"Community\", \"Government\", \"Health care provider\", \"Non-profit\", \"Other\", \"R&D\", \"Startup\", \"Traditional Company\" and \"University\".",
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
                "authId": {
                    "bsonType": "string",
                    "description": "String holding the authentication service id (Auth0).\n\nThis field is a **foreign key to the user in the Auth0 database**, connecting through the user_id field."
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
                "about": {
                    "bsonType": "string",
                    "description": "Small self-introduction, limited to 100 char"
                },
                "photo": {
                    "bsonType": "string",
                    "description": "URI with the location of the profile's photo."
                }
            },
            "oneOf": [
                {
                    "bsonType": "object",
                    "description": "Subschema representing a individual account.",
                    "properties": {
                        "type": {
                            "bsonType": "string",
                            "enum": [
                                "individual"
                            ]
                        },
                        "firstName": {
                            "bsonType": "string",
                            "description": "The first name of the user"
                        },
                        "lastName": {
                            "bsonType": "string",
                            "description": "The last name of the user. Optional field."
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
                        "urls": {
                            "bsonType": "object",
                            "description": "Document holding the user urls to external websites and social networks",
                            "properties": {
                                "facebook": {
                                    "bsonType": "string",
                                    "description": "URL to user's Facebook page."
                                },
                                "linkedin": {
                                    "bsonType": "string",
                                    "description": "URL to user's Linkedin page."
                                },
                                "twitter": {
                                    "bsonType": "string",
                                    "description": "URL to user's Twitter page."
                                },
                                "github": {
                                    "bsonType": "string",
                                    "description": "URL to user's Github page."
                                },
                                "website": {
                                    "bsonType": "string",
                                    "description": "URL to user's personal website."
                                }
                            },
                            "additionalProperties": false
                        }
                    },
                    "additionalProperties": true,
                    "required": [
                        "type",
                        "firstName",
                        "needs"
                    ]
                },
                {
                    "bsonType": "object",
                    "description": "Subschema representing an organization (colective) account.",
                    "properties": {
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
                        "ownerId": {
                            "bsonType": "objectId",
                            "description": "_id of the user who owns the organization."
                        },
                        "name": {
                            "bsonType": "string",
                            "description": "Organization's name.\n"
                        },
                        "needs": {
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
                        "language": {
                            "bsonType": "string",
                            "description": "Field to inidicate the language used by the organization."
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "type",
                        "industry",
                        "ownerId",
                        "name",
                        "needs"
                    ]
                }
            ],
            "anyOf": [
                {
                    "bsonType": "object",
                    "description": "Case where the user comes from social networks with a registration that uses email. In this case, the email field is required. This case covers the great majority of currently supported social network authentications.",
                    "properties": {
                        "email": {
                            "bsonType": "string",
                            "description": "User's email validated by a regex pattern."
                        }
                    },
                    "additionalProperties": true,
                    "required": [
                        "email"
                    ]
                },
                {
                    "bsonType": "object",
                    "description": "Case where the user comes from social networks with a registration that allows the use of only the phone. In this case, the phone field is required, and the email isn't. \n\nAn example of ocial network that falls into this case is Twitter.",
                    "properties": {
                        "phone": {
                            "bsonType": "string"
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "phone"
                    ]
                }
            ],
            "required": [
                "createdAt",
                "_id",
                "updatedAt",
                "authId"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});