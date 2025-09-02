
const express = require('express')
const router =express.Router();
const User=require('./../models/user')
const bcrypt = require('bcrypt');
const mail= require('./../codes/mail')
require('dotenv').config()
const salt = parseInt(process.env.SALT)


router.get('/', (req, res) => {
User.find().sort({_id:1}).then((data)=>res.send({response:data,responseStatus:1}))
.catch((err)=> {console.log(err); res.send({response:'Error in code',responseStatus:0})  })
})

router.get('/:id', (req, res) => {
User.findOne({_id:req.params.id}).then((data)=>res.send({response:data,responseStatus:1}))
.catch((err)=> {console.log(err); res.send({response:'Error in code',responseStatus:0})  })
})


// router.post('/', (req, res) => {
//   let b=req.body;
//   User.findOne({email:b.email}).then((user)=>{
//   if(!user){
//   let hashed=bcrypt.hashSync(b.password,salt)
//   const data = new User({firstname:b.firstname, lastname:b.lastname, email:b.email,password:hashed});
//   data.save()
//   .then((data) => { console.log(data); res.send('Record Saved!')} )
//   .catch((err)=> { console.log(err); res.send('Error')});
//       }
//       else
//       res.send('Account Already Exists')
//   })
// })

//new account creation
router.post('/', async (req, res) => {
let b=req.body;
let user=await User.findOne({email:b.email});
if(!user){
let hashed=bcrypt.hashSync(b.password,salt)

const data = new User({firstname:b.firstname, lastname:b.lastname, email:b.email,password:hashed,user_type:b.user_type});
data.save()
.then((data) => {
console.log(data);
let sub="Welcome To ReadVerse"
let msg="Account Created"
mail({to:b.email,subjetc:sub,html:msg}).catch(console.error);      
res.send({response:'Account Created !',responseStatus:1})} )
.catch((err)=> { console.log(err); res.send({response:'Error in Code',responseStatus:0})});
}
else
res.send({response:"Account Already Exists",responseStatus:0})
})
//user.password==b.password
router.post('/login', async (req, res) => {
let b=req.body;
let user=await User.findOne({email:b.email});
if(user){
if(bcrypt.compareSync(b.password,user.password))
res.send({user:user,response:'Login successful',responseStatus:1})
else
res.send({response:"Incorrect Password",responseStaus:0})
}
else
res.send({response:"Incorrect Email Adddress",responseStatus:0})
})

//forget password
router.post('/forget', async (req, res) => {
let b=req.body;
let user=await User.findOne({email:b.email});
if(user){

code=Math.floor(Math.random() * (9999 - 1000) + 1000);let sub="Reset Password"
let msg="Code to reset password "+code;
mail({to:b.email,subject:sub,html:msg}).catch(console.error);      
res.send({code:code,response:'Mail sent!',userid:user._id, responseStatus:1})
}
else
res.send({response:'Account does not exist',responseStatus:0})
})
 
//reset password
router.put('/reset/:id',async (req, res) => {
let b=req.body;
let hashed=bcrypt.hashSync(b.password,salt)
User.updateOne({_id:req.params.id},{password:hashed})
.then((data) => {console.log(data); res.send({response:'Password changed',responseStatus:1})})
.catch((err) => {console.log(err); res.send({response:'Code does not match',responseStatus:0})})
})

//editing details
router.put('/:id', (req, res) => {
let b=req.body;
let data={firstname:b.firstname,lastname:b.lastname,contactnum:b.contactnum,dob:b.dob,city:b.city,about:b.about}
User.updateOne({_id:req.params.id},data)
.then((data) => {console.log(data); res.send({response:'Details Updated',responseStatus:1})})
.catch((err) => {console.log(err); res.send({response:'Accounts does not exist',responseStatus:0})})
})

//change password
router.put('/password/:id',async (req, res) => {
let b=req.body;
let user=await User.findOne({_id:req.params.id});
if(bcrypt.compareSync(b.oldpassword,user.password)){
let hashed=bcrypt.hashSync(b.password,salt)
User.updateOne({_id:req.params.id},{password:hashed})
.then((data) => {console.log(data); res.send({response:'Password Changed',responseStatus:1})})
.catch((err) => {console.log(err); res.send({response:'Error in changing password',responseStatus:0})})
}
else{
res.send({response:"Old Password doesn't match",responseStatus:0})}
})

//activate account
router.patch('/activate/:id',async (req, res) => {
User.updateOne({_id:req.params.id},{activate:req.body.status})
.then((data) => {console.log(data); res.send({response:'Status Updated',responseStatus:1})})
.catch((err) => {console.log(err); res.send({response:'Error in code',responseStatus:0})})
})




module.exports=router;

