const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT

const cors = require('cors');
app.use(cors({origin: '*',}))

const path = require('path')
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const cat = require('./routes/category_routes')
app.use('/category', cat)

const com = require('./routes/comments_routes')
app.use('/comments', com)

const article = require('./routes/article_routes')
app.use('/article', article)

const stats = require('./routes/stats_routes')
app.use('/stats', stats)

const user = require('./routes/user_routes')
app.use('/user', user)


app.get('/', (req, res) => {
  res.send('Welcome to ReadVerse !')
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})