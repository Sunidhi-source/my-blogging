const mongoose=require('mongoose')

require('dotenv').config()
mongoose.connect(process.env.MONGO_URL);
const CommentSchema=mongoose.Schema({
    comment:{type:String, required:true},
    name:{type:String,default:null},
    article:{type:String,default:null},
    email:{type:String, required:true},
    date: {type: Date, default: Date.now },

})

const Comments=mongoose.model('Comments',CommentSchema)
module.exports=Comments


