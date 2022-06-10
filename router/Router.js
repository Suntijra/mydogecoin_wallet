//จัดการ router
const express = require('express')
const router = express.Router()
const path = require('path')


const indexPage = path.join(__dirname,'../Mobile/home.html')

router.get('/home',(req, res) => {
    res.status(200)
    res.type('text/html')
    res.sendFile(indexPage)
    // res.send(pathBrabra)
})

module.exports = router