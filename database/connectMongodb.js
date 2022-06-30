var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://santi:Santi!12321@157.245.59.56:27018/?authSource=admin&readPreference=primary&directConnection=true&ssl=false";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydogecoin-wallet");
  dbo.collection("register").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});