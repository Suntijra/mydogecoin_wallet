const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
// const router = require('./router/Router')
const app = express()
const axios = require('axios').default;




const port = 8000
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://santi:Santi!12321@157.245.59.56:27018/?authSource=admin&readPreference=primary&directConnection=true&ssl=false";
md5 = require('js-md5');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
// app.use(router)


//api rounting
app.get("/api/get/register", async (req, res) => {
    data = await get_all_register()
    return res.status(200).json({
        Result: data,
        Code: 200
    })
});
app.get('/', (req, res) => {
    res.json({ message: 'Ahoy!' });
});

app.post('/api/insert/register', (req, res) => {
    // let body = req.body;
    var username = _.get(req, ["body", "username"]); // phoneno
    var password = _.get(req, ["body", "password"]); // phoneno
    if ((username != '' || password != '')
        || (username != undefined
            || password != undefined)
        || (username != null || password != null)
        || (username != 'null' || password != 'null')
        || (username != 'undefined'
            || password != 'undefined')
        || (username != ' '
            || password != ' ')) {
        username = md5(username)
        password = md5(password)
        heckuser()
        // Registerdb(username, password)

        return res.status(200).json({ err: false, message: 'insert completed' })
    } else {
        return res.status(400).send({ err: true, message: 'error' })
    }

})





app.listen(port, () => {
    console.log('listening on port ' + port)
})

function querytest() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydogecoin-wallet");
        var query = { username: 'lek' };
        dbo.collection("register").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}
function checkuser() {
    axios('http://192.168.1.18:8000/api/get/register').then(res => {
        console.log(res.data.Result);
        data = res.data.Result
        console.log(checkuser())
    }).catch(err => {
        console.log(err);
    }
    )
}

async function get_all_register() {
    // var a;
    // MongoClient.connect(url, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("mydogecoin-wallet");
    //     dbo.collection("register").find({}).toArray(function (err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //         db.close();

    //     });
    // });
    var a = await MongoClient.connect(url)
    var dbo = await a.db("mydogecoin-wallet");
    var result = await dbo.collection("register").find({}).toArray();
    return result
}

function Registerdb(user, pass, S_reset = false, S_login = true) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydogecoin-wallet");
        var myobj = { username: `${user}`, password: `${pass}`, status_reset: `${S_reset}`, status_login: `${S_login}` };
        dbo.collection("register").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}
