const express = require('express')
const router =express.Router();
const Article=require('./../models/article')
const User=require('./../models/user')
const now = new Date();
const sdate = new Date(now.getFullYear(), now.getMonth(), 1);
const edate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);


router.get('/', async (req, res) => {
const MonthUsers = await User.countDocuments({date: {$gte: sdate,$lte: edate},user_type:'user'})
const AllUsers = await User.countDocuments({user_type:'user'})
const MonthArticles = await Article.countDocuments({date: {$gte: sdate,$lte: edate},publish:true,hidden:false})
const AllArticles = await Article.countDocuments({publish:true,hidden:false})
const data={'MonthUsers':MonthUsers,'MonthArticles': MonthArticles,'AllUsers':AllUsers,'AllArticles':AllArticles}
res.send(data)
})


module.exports=router;

