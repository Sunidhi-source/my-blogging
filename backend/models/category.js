const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL);
const CategorySchema=mongoose.Schema({
    title:{type:String, required:true},
    description: {type:String},

})

const Category=mongoose.model('Category',CategorySchema)
module.exports=Category
