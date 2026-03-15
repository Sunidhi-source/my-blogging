const express = require('express');
const app = express();
require('dotenv').config();

// FIX 1: Add a fallback for the port
const port = process.env.PORT || 5000; 

const cors = require('cors');

app.use(cors({
  origin: 'https://ink-imagination-frontend.onrender.com', // Replace with your actual frontend URL
  credentials: true
}));

const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const cat = require('./routes/category_routes');
app.use('/category', cat);

const com = require('./routes/comments_routes');
app.use('/comments', com);

const article = require('./routes/article_routes');
app.use('/article', article);

const stats = require('./routes/stats_routes');
app.use('/stats', stats);

const user = require('./routes/user_routes');
app.use('/user', user);

app.get('/', (req, res) => {
  res.send('Welcome to ReadVerse!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});