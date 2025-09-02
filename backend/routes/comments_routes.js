
const express = require('express')
const router =express.Router();
const Comments=require('./../models/comments');
const Article = require('../models/article');

router.get('/:article', (req, res) => {
  Comments.find({article:req.params.article}).sort({_id:1}).then((data)=>res.send(data))
  .catch((err)=> {console.log(err); res.send('Error!')  })
  })

  router.post('/', (req, res) => {
    let b=req.body;
    const data = new Comments({ comment:b.comment, name:b.name, email:b.email,article:b.article});
    data.save()
    .then((data) => { console.log(data); res.send('Record Saved!')} )
    .catch((err)=> { console.log(err); res.send('Error')});
   })


module.exports=router;

