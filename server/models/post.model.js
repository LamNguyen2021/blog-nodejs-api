const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  content: String,
  excerpt: String,
  lastModified: Date,
  publishDate: Date,
  urlImage: String
});

module.exports = mongoose.model("Post", schema, "Post");