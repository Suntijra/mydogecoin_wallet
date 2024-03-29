const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors')
const port = 8080
const path = require('path');


// server Unit

console.log("=====>",path.join(__dirname))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});
app.use(express.static(path.join(__dirname,"public/MobileV2")))
app.use(express.static(path.join(__dirname,"public/website")))
// console.log(express.static(path.join(__dirname,"public")))

app.listen(port, () => {
    let ip = require("ip")
    console.log('listening on port ' + port)
    console.log(ip.address() + ':'+port)
})
app.get('/api/server/stop_nodejs', (req, resp) => {
    console.log("Close Server")
    process.exit();
  })

// mobile app

app.get('/', function(req, res){
    res.sendFile("./get-start.html");
});
// app.get("/signup",(req,res) =>{
//     res.sendFile(path.join(__dirname)+"/public/MobileV2/signin-up.html");
// })

// website
// app.get("/moon-dogewallet",(req,res) =>{
//     res.sendFile(path.join(__dirname)+"/public/website/walletwebapp.html");
// })