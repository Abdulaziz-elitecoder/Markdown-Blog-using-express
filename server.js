const express = require("express");
const Article = require("./models/article");
const mongoose = require("mongoose");
const app = express();
const articleRouter = require("./routes/articles");
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1:27017/blog',{});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('MongoDB connected successfully');
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get("/", async (req, res) => {
//   const articles = [
//     {
//       title: "First Article",
//       createdAt: new Date(),
//       description: "First Article Description",
//     },
//     {
//       title: "Second Article",
//       createdAt: new Date(),
//       description: "2nd Article Description",
//     },
//   ];
  const articles = await Article.find().sort({ createdAt: 'desc'})
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);


app.listen(5000);
