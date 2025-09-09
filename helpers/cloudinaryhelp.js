const cloudinary=require('../config/cloudinary')

const uploadToCloudinary=async(filePath)=>{
    try{
        const result=await cloudinary.uploader.upload(filePath)

        return{
            url:result.secure_url,
            publicId:result.public_id
        }

    }
    catch(e){
        console.error('error while uploading to the cloudinary',e)
        throw new Error('error while uploading to the cloudinary')
    }
}

module.exports={uploadToCloudinary}