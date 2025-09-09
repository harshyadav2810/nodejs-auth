const multer=require('multer')
const path=require('path')


//disk storage
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'/uploads')
    },
    filename:function(req,file,cb){
        cb(null,
            file.fieldname+'--'+Date.now()+path.extname(file.originalname)
        )
    }
})

//file filter

const filefilter=(req,file,cb)=>{
    if(file.mimetype.startswith('image')){
        cb(null,true)
    }
    else{
        cb(new Error('not the image '))
    }


}


const upload=multer({
    storage,
    filefilter,
    limits:{
        fileSize:5*1024*1024 //5 mb
    }

})

module.exports=upload