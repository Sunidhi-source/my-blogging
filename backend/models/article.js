const mongoose=require('mongoose')
const { Schema } = mongoose;

require('dotenv').config()
mongoose.connect(process.env.MONGO_URL);
const ArticleSchema=mongoose.Schema({
    title:{type:String, required:true},
    image:{type:String, required:true},
    author:{type:String, required:true},
    category: { type: Schema.Types.ObjectId, ref: "Category" },

    // category:{type:String, required:true},
    content: {type:String},
    date: {type: Date, default: Date.now },
    publish:{type:Boolean, default:false},
    hidden:{type:Boolean, default:false},

})
const Article=mongoose.model('Article',ArticleSchema)

module.exports=Article
