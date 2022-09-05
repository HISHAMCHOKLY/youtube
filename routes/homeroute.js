const express = require('express')

const { home, login, viewlogin, logout, playvideo, register, uservideos } = require('../controllers/home')
const router=express.Router()



router
    .route('/')
    .get(home)

router
    .route('/login')
    .get(viewlogin)
    .post(login)    

router
    .route('/logout')
    .get(logout) 

router
    .route('/register')
    .get((req,res)=>{
        res.render('register')
    })
    .post(register)

router
    .route('/play/:url')  
    .get(playvideo) 
    
router
    .route('/channel/:username')
    .get(uservideos)    

module.exports=router