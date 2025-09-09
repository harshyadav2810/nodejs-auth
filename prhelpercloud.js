const cloudinary=require('./prconfigclousinary')

const uploadtoCloud= async(filePath)=>{
  try{
    const result= await cloudinary.uploader.upload(filePath)
return {
    url:result.url,
    public_id:result.public_id
}

}
catch(e){
    console.error('error in uploading the file',e)
    throw new Error('error  occured')
}
    
}

module.exports={uploadtoCloud}