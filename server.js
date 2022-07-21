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
const port = 8000
const WAValidator = require('wallet-address-validator');
const { request } = require('express');
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
    console.log("-------------------------------")
    console.log('Use API:', '/api/get/register')
    try {
        data = await get_all_register()

        return res.status(200).json({
            Result: data,
            Code: 200
        })
    }
    catch (err) {
        return res.status(500).json({
            Result: err,
            Code: 500
        })
    }
});
app.get('/', (req, res) => {
    res.json({ message: 'enjoy mydogecoin wallet' });
});

// singup ===> insertOne Data
app.post('/api/insert/register', async (req, res) => {
    console.log("-------------------------------")
    console.log('Use API:', '/api/insert/register')
    try {
        let username = _.get(req, ["body", "username"]);
        let password = _.get(req, ["body", "password"]);
        console.log('user pass=====>', username, password.length)
        if (username.length > 0 && password.length > 0 && typeof (username) === 'string' && typeof (password) === 'string') {
            username = MD5(username)
            password = MD5(password)
            const check_length = await queryUser(username)
            console.log(username)

            if (check_length[0] == 0) {
                Registerdb(username, password)
                console.log('Success')
                return res.status(200).json({
                    Result: 'Register Success',
                    Code: 200,
                    status: true
                })
            } else if (check_length[1][0].username == username) {
                console.log('Check User count :', check_length[1].length)
                if (check_length[1][check_length[1].length - 1].status_reset == true) {
                    Registerdb(username, password)
                    console.log('Success')
                    return res.status(200).json({
                        Result: 'Register Success',
                        Code: 200,
                        status: true
                    })
                } else {
                    console.log('Username already exists')
                    return res.status(200).json({
                        Result: 'Username already exists',
                        status: false
                    })
                }

            }
            else {
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
// login ===> findOne Database
app.post('/api/post/login', async (req, res) => {
    try {
        let user = _.get(req, ["body", "username"]);
        let pwd = _.get(req, ["body", "password"]);
        user = MD5(user)
        pwd = MD5(pwd)
        let date = new Date()
        let token = pwd + user + "mydogecoin-wallet" + date.getTime() + "Unitdogecoin";
        let data = await queryLogin(user, pwd)
        if (data[0] != 0) {
            // มี username && pass อยู่ในฐานข้อมูล
            console.log("token:", token)
            token = jwt.sign({ 'username': user, token: token }, jwtsecret);
            console.log("token: " + token)
            insertToken(token)
            console.log("Insert Token Success")
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
            if (valid) {
                console.log('This is a valid address');
                return res.status(200).json({ status: 'ok', pk: pk_token })
            }
            else {
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
app.post('/api/post/create-wallet', async (req, res) => {
    try {
        let token = req.body.token;
        console.log("create wallet:", token)
        let decoded = jwt.verify(token, jwtsecret);
        console.log("decoded username:", decoded.username)
        axios.post("http://167.99.71.116:3000/api/createAddressByUser", {
            "username": decoded.username
        }).then((response) => {
            console.log(response.data)
            return res.status(200).json({ status: 'ok' })
        }).catch((error) => {
            console.log(error)
            return res.status(400).json({ msg: "cannot connect to server" })
        })
        // return res.status(200).json({ msg: '???????????????????' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'fail', error: error, msg: 'Server cannot connect to database' })
    }


})
app.post('/api/post/getbalance', async (req, res) => {
    try {
        let token = req.body.token;
        console.log("token", token)
        let decoded = jwt.verify(token, jwtsecret);
        console.log("decoded username:", decoded.username)
        await axios.post("http://167.99.71.116:3000/api/getbalanceByUser", { "username": decoded.username })
        .then((response) => {
            console.log(response.data)
            return res.status(200).json({ status: 'ok',  balance: response.data })
        }).catch(error => {
            console.log(error)
            return res.status(400).json({ msg: "cannot connect to server" })
        })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'fail', error: error, msg: 'Server cannot connect to database' })
    }
})
// check authorization
app.post('/api/post/authen', async (req, resp) => {
    try {
        let token = req.headers.authorization.split('Bearer ')[1];
        token = await queryToken(token)
        // console.log("====>",token[1][0].token)
        if (token[0] != 0) {
            return resp.status(200).json({
                status: 'ok',
                msg: "authen success"
            })
        }
        else {
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
        var myobj = { username: user, password: pass, status_reset: S_reset, status_login: S_login };
        dbo.collection("register").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

function insertToken(token) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydogecoin-wallet");
        var myobj = { token: token };
        dbo.collection("token").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 token inserted");
            db.close();
        });
    });
}

async function queryToken(token) {

    let client = await MongoClient.connect(url)
    let dbo = await client.db("mydogecoin-wallet");
    let query = { 'token': token };
    let result = await dbo.collection("token").find(query).toArray();
    return [result.length, result];
}
var countPreDel = 0;
setInterval(() => {
    countPreDel++
    console.log("pre reset :", countPreDel)
    dropTokendb()
}, 3600000)
var ckdropTk = dropTokendb()
function dropTokendb() {
    let setday = { h: 0 }
    let date = new Date()
    if (setday.h == date.getHours()) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydogecoin-wallet");
            dbo.collection("token").drop(function (err, delOK) {
                if (err) {
                    console.log('err');
                    db.close();
                } else if (delOK) {
                    console.log("Token collection deleted");
                    db.close();
                }
            });
        });
    }
    else {
        console.log("not drop token")
    }
}


