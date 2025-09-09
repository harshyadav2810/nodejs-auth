const express=require('express')
const router=express.Router()
const authmiddle=require('../middleware/auth-middleware')
const adminmiddle=require('../middleware/admin-middleware')


router.get('/welcome',authmiddle,adminmiddle,(req,res)=>{
    res.json({
        message:'welcome to the admin page'
    })
})

module.exports=router


