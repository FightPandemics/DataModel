use applicationDB;

db.createCollection( "UserSchema",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "UserSchema",
            "additionalProperties": false,
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "accessToken": {
                    "bsonType": "string"
                },
                "dateJoined": {
                    "bsonType": "date"
                },
                "email": {
                    "bsonType": "string"
                },
                "firstName": {
                    "bsonType": "string"
                },
                "lastName": {
                    "bsonType": "string"
                },
                "location": {
                    "bsonType": "objectId"
                }
            },
            "required": [
                "email",
                "firstName",
                "_id"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});