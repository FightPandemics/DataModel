use applicationDB;

db.createCollection( "OrganizationSchema",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "OrganizationSchema",
            "additionalProperties": false,
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "address": {
                    "bsonType": "string"
                },
                "androidUrl": {
                    "bsonType": "string"
                },
                "description": {
                    "bsonType": "string"
                },
                "email": {
                    "bsonType": "string"
                },
                "global": {
                    "bsonType": "bool"
                },
                "industry": {
                    "bsonType": "string"
                },
                "iosUrl": {
                    "bsonType": "string"
                },
                "language": {
                    "bsonType": "string"
                },
                "linkedinUrl": {
                    "bsonType": "string"
                },
                "location": {
                    "bsonType": "objectId"
                },
                "name": {
                    "bsonType": "string"
                },
                "needs": {
                    "bsonType": "array",
                    "additionalItems": true,
                    "uniqueItems": false
                },
                "ownerId": {
                    "bsonType": "objectId"
                },
                "twitterUrl": {
                    "bsonType": "string"
                },
                "type": {
                    "bsonType": "string"
                },
                "website": {
                    "bsonType": "string"
                }
            },
            "required": [
                "email",
                "industry",
                "name",
                "needs",
                "type",
                "_id"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});