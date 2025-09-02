const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL);
const UserSchema=mongoose.Schema({
    firstname:{type:String, required:true}, 
    lastname:{type:String, required:true}, 
    contactnum: {type:Number, default:null},
    dob: {type: Date, default:null},
    city:{type:String,default:null},
    about: {type:String,default:null},
    email: {type:String, required:true},
    user_type: {type:String, default:'user'},
    
    password: {type:String,required:true},
    activate:{type:Boolean, default:true},
    date: {type: Date, default: Date.now },


})
const User=mongoose.model('User',UserSchema)

module.exports=User
