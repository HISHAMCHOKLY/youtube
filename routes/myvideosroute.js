const express = require('express')
const { myvideohome, upload, uploaded } = require('../controllers/myvideos')
const { isLoggedin } = require('../middlewares/md1')

const router=express.Router()



router
    .route('/')
    .get(isLoggedin,myvideohome)

router
    .route('/upload')
    .get(isLoggedin,upload)
    .post(uploaded)



module.exports=router    