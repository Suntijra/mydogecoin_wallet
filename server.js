const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
// const router = require('./router/Router')
const app = express()
const axios = require('axios').default;
const MD5 = require('js-md5');
var jwt = require('jsonwebtoken');
var cors = require('cors')
const jwtsecret = 'Unitdogecoin-wallet';
var token;
const port = 8000
const WAValidator = require('wallet-address-validator');
const jwt_secretPk = 'mydogecoin-private-key';


// server Unit
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://dom:dom123@167.99.71.116:27017/?directConnection=true&appName=mongosh+1.5.0&authMechanism=DEFAULT";



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

// singup ===> insertOne Data
app.post('/api/insert/register', async (req, res) => {

    try {
        let username = _.get(req, ["body", "username"]);
        let password = _.get(req, ["body", "password"]);
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
            console.log('username ===>', username)

            console.log('position :', 0)
            if (check_length[0] == 0) {
                console.log('position :', 1)
                Registerdb(username, password)
                return res.status(200).json({
                    Result: 'Register Success',
                    Code: 200,
                    status: true
                })
            } else if (check_length[1][0].username == username) {
                console.log('position :', 2)
                if (check_length[1][0].status_reset == true) {
                    console.log('position :', 3)
                    Registerdb(username, password)
                    return res.status(200).json({
                        Result: 'Register Success',
                        Code: 200,
                        status: true
                    })
                } else {
                    console.log('position :', 4)
                    return res.status(200).json({
                        Result: 'Username already exists',
                        status: false
                    })
                }

            }
            else {
                console.log('position :', 5)
                return res.status(400).json({
                    Result: 'Server cannot connect to database',
                    Code: 404,
                    status: false,
                    Log: 1
                })
            }
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
// login
app.post('/api/post/login', async (req, res) => {
    console.log(1)
    try {
        console.log(2)
        let user = _.get(req, ["body", "username"]);
        let pwd = _.get(req, ["body", "password"]);
        user = MD5(user)
        pwd = MD5(pwd)
        data = await queryLogin(user, pwd)
        if (data[0] != 0) {
            token = jwt.sign({ user: data[1] }, jwtsecret);
            return res.status(200).json({
                Result: 'Login Success',
                status: 'success',
                token: token
            })
        } else {
            return res.status(200).json({
                Result: 'Login Failed',
                status: 'error'
            })
        }
    } catch {
        console.log(3)
        return res.status(400).json({
            Result: 'Server cannot connect to database',
            Code: 404,
            status: false
        })
    }

})
app.post('/api/post/import-wallet', async (req, res) => {
    let pk_token = '';
    try {
        let pk = _.get(req, ["body", "pk"]);
        if (pk != '' || pk != undefined || pk != null || pk != 'null' || pk != 'undefined' || pk != ' ') {
            pk_token = jwt.sign({ pk: pk }, jwt_secretPk);
            let valid = WAValidator.validate(pk, 'DOGE');
            if (valid){
                console.log('This is a valid address');
                return res.status(200).json({ status: 'ok', pk: pk_token })
            }
            else{
                console.log('Address INVALID');
                return res.status(200).json({ status: 'fail', pk: pk_token })
            }       
            
        } else {
            return res.status(200).json({ status: 'Not found pk', pk: pk })
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            status: 'fail'
        })
    }

})
// check authorization
app.post('/api/post/authen', async (req, resp) => {
    try {
        let token = req.headers.authorization.split('Bearer ')[1];
        let decoded = jwt.verify(token, jwtsecret);
        let user = decoded.user[0].username
        let pwd = decoded.user[0].password
        let data = await queryLogin(user, pwd)
        if (data[0] != 0) {
            return resp.status(200).json({
                status: 'ok',
                msg: "authen success"
            })
        } else {
            return resp.status(200).json({
                status: 'error',
                msg: "not found authen"
            })
        }
    } catch (err) {
        console.log(err)
        return resp.status(400).json({
            Result: 'Server cannot connect to database',
            Code: 404,
            status: false
        })
    }
})


app.listen(port, () => {
    console.log('listening on port ' + port)
})

async function queryLogin(user, pass) {
    var client = await MongoClient.connect(url)
    var dbo = await client.db("mydogecoin-wallet");
    var query = { username: user, password: pass };
    var result = await dbo.collection("register").find(query).toArray();
    return [result.length, result];

}
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
