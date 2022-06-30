const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {};

MongoClient.connect(
  'mongodb://santi:Santi!12321@157.245.59.56:27018/?authSource=admin&readPreference=primary&directConnection=true&ssl=false',
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db('mydogecoin-wallet').collection('register');
    coll.find(filter, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  });