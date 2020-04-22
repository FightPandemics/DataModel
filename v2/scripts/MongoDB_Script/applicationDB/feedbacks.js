use applicationDB;

db.createCollection( "feedbacks",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "feedbacks",
            "description": "Collection to hold feedback on the application.\n\nThis may be done with the user logged or not and, depending on that, we may or may not have a reference to the user in question at this model.",
            "additionalProperties": false,
            "properties": {
                "_id": {
                    "bsonType": "objectId",
                    "description": "Automatically generated object_id as primary key."
                },
                "createdAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the feedback's creation date"
                },
                "updatedAt": {
                    "bsonType": "date",
                    "description": "Timestamp with the feedback's last update date"
                },
                "rating": {
                    "bsonType": "number",
                    "description": "A rating, in a scale of 1 to 5, of the application.\n\nCurrently present as: \"How well does FIghtPandemics meet your needs?\".\n\nPresent in the first part of the feedback and, therefore, is required.",
                    "minimum": 1,
                    "maximum": 5
                },
                "ipAddress": {
                    "bsonType": "string",
                    "description": "Caputred IP address in order to get user's location even if they are not logged.\n\nCaptured at the first part of the feedback and, therefore, is required."
                },
                "age": {
                    "bsonType": "long",
                    "description": "User's age.\n\nCurrently present as: \"What is your age?\".\n\nPresent in the third part of the feedback and, therefore, not required.",
                    "minimum": 18
                },
                "mostValuableFeature": {
                    "bsonType": "string",
                    "description": "User's feedback into what is the features most valuable for him/her.\n\nCurrently present as: \"Which features are the most valuable for you?\".\n\nPresent in the second part of the feedback and, therefore, not required."
                },
                "whatWouldChange": {
                    "bsonType": "string",
                    "description": "User's feedback into what he/she would change about the application.\n\nCurrently present as: \"If you could change one thing about FightPandemics, what would it be?\".\n\nPresent in the second part of the feedback and, therefore, not required."
                },
                "generalFeedback": {
                    "bsonType": "string",
                    "description": "User's general feedback section.\n\nCurrently present as: \"Any other feedback for us?\".\n\nPresent in the second part of the feedback and, therefore, not required."
                },
                "covidImpact": {
                    "bsonType": "string",
                    "description": "User's feedback into how the COVID impacted him.\n\nCurrently present as a multiple choice question.\n\n**Question:** \"How has COVID-19 impacted you?\"\n\n**Options:** \n\n1. I go to work/school normally\n2. I am healthy but in a stay-at-home quarentine\n3. I have mild symptoms but haven't been tested\n4. I am diagnosed with COVID-19\n\n\nPresent in the second part of the feedback and, therefore, not required."
                },
                "userId": {
                    "bsonType": "objectId",
                    "description": "Reference to the user's _id.\n\nThis will be present only if the user was logged in when completing the feedback."
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
            "required": [
                "createdAt",
                "_id",
                "updatedAt",
                "rating",
                "ipAddress"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});