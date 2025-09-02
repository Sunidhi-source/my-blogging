const express = require('express')
const router =express.Router();
const Article=require('./../models/article')
const ImageUpload=require('./../codes/image')

// for all articles (admin)
router.get('/', (req, res) => {
Article.find().sort({_id:1}).then((data)=>res.send({response:data,responseStatus:1}))
.catch((err)=> {console.log(err); res.send({response:'Error in code',responseStatus:0})  })
})

//all published aricles
router.get('/latest/all', (req, res) => {
Article.find({publish:true,hidden:false}).populate("category").sort({_id:1}).then((data)=>res.send({response:data,responseStatus:1}))
.catch((err)=> {console.log(err); res.send({response:'Error in code',responseStatus:0})  })
})

// home page
router.get('/latest', (req, res) => {
Article.find({publish:true,hidden:false}).populate("category").sort({_id:1}).limit(6).then((data)=>res.send({response:data,responseStatus:1}))
.catch((err)=> {console.log(err); res.send({response:'Error in code',responseStatus:0})  })
})

// single article
router.get('/:id', (req, res) => {
Article.findOne({_id:req.params.id}).populate("category")
.then((data)=>res.send({response:data,responseStatus:1}))
.catch((err)=> {console.log(err); res.send({response:'Error in code',responseStatus:0})  })
})
// category Wise
router.get('/category/:cat', (req, res) => {
Article.find({category:req.params.cat,publish:true,hidden:false}).populate("category").sort({_id:1}).then((data)=>res.send({response:data,responseStatus:1}))
.catch((err)=> {console.log(err); res.send({response:'Error in code',responseStatus:0})  })
})

// Author Wise
router.get('/author/:author', (req, res) => {
Article.find({author:req.params.author}).sort({_id:1}).then((data)=>res.send({response:data,responseStatus:1}))
.catch((err)=> {console.log(err); res.send({response:'Error in code',responseStatus:0})  })
})
// Save new Article 
router.post('/',ImageUpload.single('image'), (req, res) => {
console.log(1)
let b=req.body;
const data = new Article({ title:b.title, image:req.file.originalname , author:b.author,
content:b.content, category:b.category});
data.save()
.then((data) => { console.log(data); res.send({response:'Details Saved',responseStatus:1})} )
.catch((err)=> { console.log(err); res.send({response:'Error in code',responseStatus:0})});
})

//edit details
router.put('/:id', (req, res) => {
let b=req.body;
let data={content:b.content,category:b.category,title:b.title}
Article.updateOne({_id:req.params.id},data)
.then((data) => {console.log(data); res.send({response:'Details Updated',responseStatus:1})})
.catch((err) => {console.log(err); res.send({response:'Invalid credentials',responseStatus:0})})
})

//edit image
router.put('/image/:id',ImageUpload.single('image'), (req, res) => {
let data={image:req.file.originalname}
Article.updateOne({_id:req.params.id},data)
.then((data) => {console.log(data); res.send({response:'Image Updated',responseStatus:1})})
.catch((err) => {console.log(err); res.send({response:'Invalid credentials',responseStatus:0})})
})

//delete record
router.delete('/:id', (req, res) => {
Article.deleteOne({_id:req.params.id}).then((data) => {console.log(data); res.send({response:'Record deleted',responseStatus:1})})
.catch((err)=> {console.log(err); res.send({response:'Invalid credentials',responseStatus:0})});
})

//publish article
router.patch('/publish/:id',async (req, res) => {
Article.updateOne({_id:req.params.id},{publish:req.body.status})
.then((data) => {console.log(data); res.send({response:'Status Updated',responseStatus:1})})
.catch((err) => {console.log(err); res.send({response:'Invalid credentials',responseStatus:0})})
})

//hide article
router.patch('/hidden/:id',async (req, res) => {
Article.updateOne({_id:req.params.id},{hidden:req.body.status})
.then((data) => {console.log(data); res.send({response:'Status Updated',responseStatus:1})})
.catch((err) => {console.log(err); res.send({response:'Invalid credentials',responseStatus:0})})
})

module.exports=router;

