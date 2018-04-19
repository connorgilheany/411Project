const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('mean');
        closure(db);
    });
};

module.exports = connection;