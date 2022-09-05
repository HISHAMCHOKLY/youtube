require('dotenv').config()
const express = require('express')
const app=express()
const MongoClient = require('mongodb').MongoClient
const cookieParser=require('cookie-parser')

const url=process.env.DB_URL

const dbClient = new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})


app.set('view engine','ejs')
app.use(express.static('static'))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


dbClient.connect((err)=>{
    if(err){
        console.log('connection failed')
    }else{
        console.log('connected');
    }
})

let homeroute=require('./routes/homeroute')
let myvideosroute=require('./routes/myvideosroute')


app.use('/',homeroute)
app.use('/myvideos',myvideosroute)

app.listen(3000)
