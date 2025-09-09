const User=require('./models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//register a user

const registeruser= async(req,res)=>{
    try{
        const {username,email,password,role}=req.body
        const alreadyexists=await  User.findOne({$or: [{username},{email}]})
        if(alreadyexists){
            return res.status(401).json({
                message:'user already exists',
                success:false
            })
         }

         //hash the password

         const salt=await bcrypt.genSalt(10)
         const hashedpass=await bcrypt.hash(password,salt)


         // create database for the new user

         const newuser=new User({
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
        res.status(401).json({
            message:'error occured',
            success:false
        })
    }
}

//login user

const loginuser= async(req,res)=>{
    try{
        const {username,password}=req.body
        const userexists=await User.findOne({username})
        if(!userexists)
        {
            res.status(401).json({
                message:'user doesnt exists',
                success:false
            })
        }

        // check for the pasword is corect or not 

        const ifpassc=await bcrypt.compare(password,userexists.password)
        if(!ifpassc){
            res.status(401).json({
                message:'password is incorresct',
                success:false
            })
        }
      //crete a user token
        const accesstoken=jwt.sign({
            userId:userexists._id,
            user_name:userexists.username,
            role:userexists.role
        },process.env.JWT_SECRET_KEY,{
            expiresIn:'30m'
        })

        res.status(200).json({
            message:'user logged in ',accesstoken,
            success:true
        })


    }
    catch(e){
        res.status(401).json({
            message:'error in logging  the user',
            success:false
        })
    }
}

module.exports={registeruser,loginuser}



