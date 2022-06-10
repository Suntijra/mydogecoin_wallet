const express = require('express')
const app = express()
const path = require('path')
const port = 3000

const indexPage = path.join(__dirname,'./Mobile/index.html')

app.get('/home',(req, res) => {
    res.status(200)
    res.type('text/html')
    res.sendFile(indexPage)
})
app.listen(port,()=>{
    console.log('listening on port '+port)
})