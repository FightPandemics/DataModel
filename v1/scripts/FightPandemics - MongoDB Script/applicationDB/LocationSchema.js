use applicationDB;

db.createCollection( "LocationSchema",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "LocationSchema",
            "additionalProperties": false,
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                }
            }
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});