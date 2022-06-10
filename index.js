const express = require('express')
const router = require('./router/Router')
const app = express()
const port = 3000

app.use(router)
app.listen(port,()=>{
    console.log('listening on port '+port)
})