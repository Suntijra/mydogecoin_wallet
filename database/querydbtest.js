var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://santi:Santi!12321@157.245.59.56:27018/?authSource=admin&readPreference=primary&directConnection=true&ssl=false";
// function querytest(){
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("mydogecoin-wallet");
//         var query = { username : 'lek' };
//         dbo.collection("register").find(query).toArray(function(err, result) {
//           if (err) throw err;
//           console.log(result);
//           db.close();
//         });
//       });
// }

async function querytest() {
  let R_result ;
  await MongoClient.connect(url, async function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydogecoin-wallet");
      var query = { username: 'dd988cfd769c9f7fbd795a0f5da8e751'};
      await dbo.collection("register").find(query).toArray( async function (err, result) {
          if (err) throw err;
          db.close();
          R_result = result;
      });
  });
  console.log(R_result);
}
querytest()