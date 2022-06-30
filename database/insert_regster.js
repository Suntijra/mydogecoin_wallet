var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://santi:Santi!12321@157.245.59.56:27018/?authSource=admin&readPreference=primary&directConnection=true&ssl=false";

function Registerdb(user,pass,S_reset =false,S_login =true){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydogecoin-wallet");
        var myobj = { username: `${user}`, password: `${pass}`, status_reset: `${S_reset}`, status_login: `${S_login}` };
        dbo.collection("register").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
}
Registerdb('lek','123')
