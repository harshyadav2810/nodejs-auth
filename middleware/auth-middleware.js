
const jwt=require('jsonwebtoken')
const authmiddle=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    const token=authHeader&&authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:'user not logged in',
            success:false
        })
    }
    //decode this token

    try{
      const decodedtoken=jwt.verify(token,process.env.JWT_SECRET_KEY)
      req.userCred=decodedtoken
      next()

    }
    catch(e){
         return res.status(401).json({
            message:'user not logged in',
            success:false
    })}

    
}

module.exports=authmiddle