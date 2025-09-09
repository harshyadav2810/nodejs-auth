const express=require('express')
const router=express.Router()
const authmiddle=require('../middleware/auth-middleware')

// we have to protect this route from random access only allow when the user is logged in 

router.get('/welcome',authmiddle,(req,res)=>{

    const{username,userId,role}=req.userCred
    res.json({
        message:'welcome to the home page',
        user:{
            username,
            userid:userId,
            userrole:role
        }
    })
})

module.exports=router