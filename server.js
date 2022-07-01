const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
// const router = require('./router/Router')
const app = express()
const axios = require('axios').default;
const MD5 = require('js-md5');



const port = 8000
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://santi:Santi!12321@157.245.59.56:27018/?authSource=admin&readPreference=primary&directConnection=true&ssl=false";



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
    res.json({ message: 'enjoy mydogecoin wallet' });
});

app.post('/api/insert/register', async (req, res) => {
    // let body = req.body;

    try {
        let username = _.get(req, ["body", "username"]); // phoneno
        let password = _.get(req, ["body", "password"]); // phoneno
        if ((username != '' || password != '')
            || (username != undefined
                || password != undefined)
            || (username != null || password != null)
            || (username != 'null' || password != 'null')
            || (username != 'undefined'
                || password != 'undefined')
            || (username != ' '
                || password != ' ')) {
            username = MD5(username)
            password = MD5(password)
            const check_length = await queryUser(username)
            // let reset_check = await get_all_register()
            console.log('username ===>',username)
            // console.log('count',check_length[0], 'object :',check_length[1][0].username)


            console.log('position :',0)
            // console.log('length ==', check_length[0][1].username)
            if (check_length[0] == 0) {
                console.log('position :',1)
                Registerdb(username, password)
                return res.status(200).json({
                    Result: 'Register Success',
                    Code: 200,
                    status: true
                })
            } else if (check_length[1][0].username == username) {
                console.log('position :',2)
                if (check_length[1][0].status_reset == true) {
                    console.log('position :',3)
                    Registerdb(username, password)
                    return res.status(200).json({
                        Result: 'Register Success',
                        Code: 200,
                        status: true
                    })
                } else {
                    console.log('position :',4)
                    return res.status(200).json({
                        Result: 'Username already exists',
                        status: false
                    })
                }

            }
            else {
                console.log('position :',5)
                return res.status(400).json({
                    Result: 'Server cannot connect to database',
                    Code: 404,
                    status: false,
                    Log: 1
                })
            }
            // Registerdb(username, password)

            // return res.status(200).json({ err: false, message: 'insert completed' })
        } else {
            console.log(5)
            return res.status(400).json({
                Result: 'Server cannot connect to database',
                Code: 404,
                status: false
            })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            Result: 'Server cannot connect to database',
            Code: 404,
            Log: 0
        })
    }



})


// app.get("/test", async (req, res) => {
//     data = await  querytest()
//     return res.status(200).json({
//         Code: 200,
//         Result: data
//     })
// });


app.listen(port, () => {
    console.log('listening on port ' + port)
})
async function queryUser(user) {
    var client = await MongoClient.connect(url)
    var dbo = await client.db("mydogecoin-wallet");
    var query = { username: user };
    var result = await dbo.collection("register").find(query).toArray();
    return [result.length, result];

}




async function get_all_register() {
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
