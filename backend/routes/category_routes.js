const express = require('express')
const router =express.Router();
const Category=require('./../models/category')

router.get('/', (req, res) => {
Category.find().sort({_id:1}).then((data)=>res.send(data))
.catch((err)=> {console.log(err); res.send('Error!')  })
})

router.get('/:id', (req, res) => {
let id=req.params.id
Category.findOne({_id:id}).then((data)=>res.send(data))
.catch((err)=> {console.log(err); res.send('Error!')  })
})


router.post('/', (req, res) => {
let b=req.body;
const data = new Category({ title:b.title, description:b.description});
data.save()
.then((data) => { console.log(data); res.send({response:'Record Saved!',responseStatus:1})} )
.catch((err)=> { console.log(err); res.send({response:'Error in code', responseStatus:0})});
})

router.put('/:id', (req, res) => {
let b=req.body;
let data={title:b.title,description:b.description}
Category.updateOne({_id:req.params.id},data)
.then((data) => {console.log(data); res.send('Data Updated!')})
.catch((err) => {console.log(err); res.send("Error!")})
})

router.delete('/:id', (req, res) => {
Category.deleteOne({_id:req.params.id}).then((data) => {console.log(data); res.send({response:'Record Deleted!',responseStatus:1})})
.catch((err)=> {console.log(err); res.send({response:'Error in code', responseStatus:0})});
})


module.exports = router

