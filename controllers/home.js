const cookieToken = require('../utils/cookieToken')
const MongoClient = require('mongodb').MongoClient

const url='mongodb+srv://hisham:asdfgh000@cluster0.pjrzdkb.mongodb.net/hisham'

const dbClient = new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})

exports.home=async(req,res)=>{
    let videos=[]
    const database=dbClient.db('youtube')
    let data=await database.collection('videos').find()
    await data.forEach((i)=>{
        videos.push(i);
    })
    console.log(req.cookies);
    let loggedin=req.cookies
    res.render('home',{loggedin,videos})
}

exports.viewlogin=(req,res)=>{

    res.render('login')
}

exports.login = async (req,res,next)=>{
    const {username,password} = req.body

    const database=dbClient.db('youtube')
    let user=await database.collection('users').findOne({username:username})
   
    if(!user){
        return res.redirect('/login')
    }
    if(user.password!=password){
        return res.redirect('/login')
    }
    cookieToken(user,res)
}
exports.logout = async (req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).redirect('/')
}
exports.playvideo=async(req,res)=>{
    let url=req.params.url
    const database=dbClient.db('youtube')
    let cvideo=await database.collection('videos').findOne({url:url})
    let updateview=parseInt(cvideo.views)+1
    await database.collection('videos').updateOne({url:cvideo.url},{ $set: {views:updateview}})
    console.log(cvideo);
    res.render('playvideo',{cvideo})

}

exports.register=async(req,res)=>{
    let {username,password}=req.body
    const database=dbClient.db('youtube')
    await database.collection('users').insertOne({username:username,password:password})
    res.redirect('/login')
}

exports.uservideos=async(req,res)=>{
    let loggedin=req.cookies
    let uploader=req.params.username
    let videos=[]
    const database=dbClient.db('youtube')
    let data=await database.collection('videos').find()
    await data.forEach((i)=>{
        videos.push(i);
    })
    let uservideo=videos.filter((x)=>x.user==uploader)
    console.log(uservideo);
    res.render('viewvideos',{uservideo,loggedin,uploader})
}