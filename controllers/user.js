let cookieToken=require('../utils/cookieToken')
exports.login = async (req,res,dbClient)=>{
    const {username,password} = req.body
    const database=dbClient.db('youtube')
    let user=await database.collection('users').findOne({username:username})
    
    if(!user){
        return res.redirect('/login')
    }
    // if(user.password != password){
    //     return res.redirect('/login')

    // }
    if(!(user.password==password)){
        return res.redirect('/login')
    }
    cookieToken(user,res)
}

exports.logout = async (req,res)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).redirect('/')
}
exports.register=async(req,res,dbClient)=>{
    let {username,password}=req.body
    const database=dbClient.db('youtube')
    await database.collection('users').insertOne({username:username,password:password})
    res.redirect('/login')
}
