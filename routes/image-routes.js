const express=require('express')
const authmiddle=require('../middleware/auth-middleware')
const adminmiddle=require('../middleware/admin-middleware')
const upload=require('../middleware/image-middleware')
const router=express.Router()
const {uploadImageController,fetchimages,deleteImageController}=require('../controller/imagecontroller')


//upload a image

router.post('/upload',authmiddle,adminmiddle,upload.single('image'),uploadImageController)
router.get('/fetch',authmiddle,fetchimages)
router.delete('/:id',authmiddle,adminmiddle,deleteImageController)





// get all the images






module.exports=router