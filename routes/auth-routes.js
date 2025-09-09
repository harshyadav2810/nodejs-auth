const express=require('express')
const {registerUser,loginUser,changePassword}=require('../controller/auth')

const router=express.Router()
const authmiddle=require('../middleware/auth-middleware')

//all routes are related with the authorization 


router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/change',authmiddle,changePassword)

 



module.exports=router