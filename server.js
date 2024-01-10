const express = require('express');
const mongoose = require('mongoose');
const app = express();
const articleRouter = require('./routes/articles');

// mongoose.connect('mongodb://localhost/blog')

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use('/articles', articleRouter);


app.get('/', (req, res) => {
    const articles = [{
        title : 'First Article',
        createdAt : new Date(),
        description : 'First Article Description'
    },
    {
        title : 'Second Article',
        createdAt : new Date(),
        description : '2nd Article Description'
    },
]
    res.render('articles/index',{articles:articles});
})

app.listen(5000)