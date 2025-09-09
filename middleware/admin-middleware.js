const isAdmin=(req,res,next)=>{
    if(req.userCred.role!=='admin'){
        res.status(401).json({
            message:'access denied as not the admin',
            success:false
        })
    }
    next()
}

module.exports=isAdmin