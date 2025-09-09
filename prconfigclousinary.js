const cloudinary=require('cloudinary').v2
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:CLOUDINARY_API_KEY,
    secret_key:CLOUDINARY_SECRET_KEY
})

module.exports=cloudinary