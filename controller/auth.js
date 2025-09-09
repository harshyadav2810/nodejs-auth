const User=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//register controller
const registerUser=async (req,res)=>{
    try{
        //extract user information from the frontend
        const {username,email,password,role}=req.body
        const alreadyexists=await User.findOne({$or: [{username},{email}]})


        if(alreadyexists){
            return res.status(400).json({
                message:'user with the similar email or username already exists',
                success:false,


            })
        }

        //hash user password
        const salt=await bcrypt.genSalt(10)
        const hashedpass=await bcrypt.hash(password,salt)

        // create new User

        const newuser= new User({
            username,
            email,
            password:hashedpass,
            role:role||'user'

        })

        await newuser.save()
       if(newuser)
       {
        res.status(200).json({
            message:'user registered successfully',
            success:true
        })
       }
       else{
        res.status(200).json({
            message:'user  not-registered ',
            success:false
        })
       }

       


    }
    catch(e){
        console.log(e)
        res.status(500).json({
            message:'error occured'
        })
    }
}

//login controller

const loginUser=async(req,res)=>{
    try{
        const {username,password}=req.body
        const userexists=await User.findOne({username})

        if(!userexists)
        {
            res.status(400).json({
                success:false,
                message:'user doesnt exists'
            })
        }
       const ifpassc=await bcrypt.compare(password,userexists.password)
        if(!ifpassc)
        {
            res.status(400).json({
                success:false,
                message:'invalid data'
            })
        }

     //create user token 


       const accesstoken=jwt.sign({
        userId:userexists._id,
        username:userexists.username,
        role:userexists.role

       },process.env.JWT_SECRET_KEY,{
        expiresIn:'30m'
       })

       res.status(200).json({
        message:'user logged in ',accesstoken,
        success:true,
        
       })



    }
    catch(e){
        console.log(e)
        res.status(500).json({
            message:'error occured'
        })
    }
}

//change user password

const changePassword=async(req,res)=>{
    try{
        const{oldpassword,newpassword}=req.body
        const userId=req.userCred.userId

        //find current user

        const user= await User.findById(userId)
        if(!user){
            res.status(400).json({
                message:'user not logged in ',
                success:false
            })
        }
        //check if old password is correct or not

        const iscorrect= await bcrypt.compare(oldpassword,user.password)
        if(!iscorrect){
            return res.status(400).json({
                message:'old password is not correct',
                success:false
            })
        
        }

        const salt= await bcrypt.genSalt(10)
        const newhashedpassword=await bcrypt.compare(newpassword,salt)

        //update our password

        user.password=newhashedpassword
        await user.save()

        res.status(200).json({
            message:'password changed successfully',
            sucesss:true
        })


    }
    catch(e){
       res.status(400).json({
        message:'error in finding the file',
        success:false
       })
    }
}

module.exports={registerUser,loginUser,changePassword}