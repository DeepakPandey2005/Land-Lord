const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const {auth_db}=require('./auth')
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})
const userModel=auth_db.model('users',userSchema)
module.exports=userModel