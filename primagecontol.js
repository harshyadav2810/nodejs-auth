const {uploadtoCloud}=require('./prhelpercloud')
const Image=require('./models/image')


// upload the image
const imagecontroller= async(req,res)=>{
try{

    if(!req.file){
        res.status(401).json({
            message:'this file doesnt exists',
            success:false

        })
    }
    // upload to cloud
     const {public_id,url}=await uploadtoCloud(req.file.path)
 /// database created for the image 
     const newimage=new Image({
        url,
        public_id,
        uploadedby:req.userCed.userId

     })

     await newimage.save()

     res.status(200).json({
        message:'image upload successfullly',
        success:true
     })
   

}
catch(e){
    res.status(401).json({
        message:'error in uploading the file',
        success:false
    })
}

}

// fetch all images
const fetchimage= async(req,res)=>{

    try{
        const images= await Image.find({})
        if(images){
            res.status(200).json({
                message:'image found',
                succcess:true
            })
        }
        else{
            res.status(401).json({
                message:'image notfound. please upload it',
                success:false
            })
        }
        

    }
    catch(err){
        res.status(401).json({
            message:'error in finding the images',
            success:false
        })
    }
}

module.exports={imagecontroller,fetchimage}