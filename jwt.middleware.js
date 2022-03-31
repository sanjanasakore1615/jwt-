
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports={
    checkToken:(req, res, next)=>{
    const  token =req.headers.token;
    if(token) {
    jwt.verify(token,config.secret,(err,decoded)=>{
        if(err) {
            res.send("UnAuthorized user token");
        }else{
            req.user=decoded;
            next();
        }
    });
    }else{
        res.send({error:true,
            Message:"Token not provided"});
    }
   }
}