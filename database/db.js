const mongoose=require('mongoose')


const connecttodb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            
        })
        console.log('mongodb connected successfully')

    }
    catch(e){
        console.log('connection failed')
    }
}

module.exports=connecttodb