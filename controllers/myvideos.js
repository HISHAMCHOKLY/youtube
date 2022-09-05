const cookieToken = require('../utils/cookieToken')
const MongoClient = require('mongodb').MongoClient

const url='mongodb+srv://hisham:asdfgh000@cluster0.pjrzdkb.mongodb.net/hisham'

const dbClient = new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})



exports.myvideohome=async(req,res)=>{
    let loggedin=req.cookies
    let videos=[]
    const database=dbClient.db('youtube')
    let data=await database.collection('videos').find()
    await data.forEach((i)=>{
        videos.push(i);
    })
    let uservideo=videos.filter((x)=>x.user==loggedin.token.user)
    console.log(uservideo);
    res.render('myvideos',{loggedin,uservideo})
}
exports.upload=(req,res)=>{
    let loggedin=req.cookies
    res.render('upload')

}

exports.uploaded=async(req,res)=>{
    let loggedin=req.cookies.token.user
    let url=req.body.url
    console.log(loggedin);
    console.log(Date.now());
    console.log(url);
    const database=dbClient.db('youtube')
    await database.collection('videos').insertOne({id:Date.now(),user:loggedin,url:url,views:0})
    res.redirect('/myvideos')

}