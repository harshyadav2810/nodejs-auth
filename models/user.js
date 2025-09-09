const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        trim:true,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true

    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user' //only allow user or admin roles


    }

},{timestamps:true})


module.exports=mongoose.model('User',UserSchema)