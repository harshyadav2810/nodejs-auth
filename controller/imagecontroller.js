const Image=require('../models/image')
const {uploadToCloudinary}=require('../helpers/cloudinaryhelp')
const fs=require('fs')
const cloudinary=require('../config/cloudinary')

const uploadImageController= async(req,res)=>{
    try{
        if(!req.file){
            return res.status(401).json({
                message:'file not found please upload it',
                success:false
            }) 
        }
      // upload to cloudinary
        const {publicId,url}=await uploadToCloudinary(req.file.path) 
      // storing in database
        const newImage=new Image({
            url,
            publicId,
            uploadedby:req.userCred.userId



        })
        await newImage.save()
        // fs.unlinkSync(req.file.path)// remove file from the local storage

        res.status(201).json({
            message:'image uploaded successfully',
            success:true,
            image:newImage
        })

    }
    catch(e){
        res.status(401).json({
            message:'error in uploading  the image',
            success:false
        })
    }
}

//fetch all images
const fetchimages=async (req,res)=>{
    try{
        const imagef= await Image.find({})
        if(imagef){
            res.status(200).json({
                message:'images found',
                success:true,
                show:imagef

            })
        }
        else{
            res.status(401).json({
                message:'images not found',
                success:false
            })
        }

    }
     catch(e){
        res.status(401).json({
            message:'error in fetching  the image',
            success:false
        })
    }
    
}

const deleteImageController= async(req,res)=>{
    try{
    const userId=req.userCred.userId
    const deletedImageId= req.params.id

    const image=await Image.findById(deletedImageId)
    if(!image){
        return res.status(404).json({
            message:'filenot found',
            success:false
        })
    }

    //check if the same person is trying to delete the image who has uploaded the image
        if(image.uploadedby.toString()!==userId){
          return   res.status(401).json({
           message:'you cant delete this image',
           success:false
            })
        }

        // delete the image from the cloudinary storage
           await cloudinary.uploader.destroy(image.publicId)
        //delete from the database
      await Image.findByIdAndDelete(deletedImageId)

      res.status(200).json({
        message:'image deleted successfully',
        success:true
      })

}
catch(e){
    res.status(401).json({
            message:'error in fetching  the image',
            success:false
        })
}}

module.exports={uploadImageController,fetchimages,deleteImageController}