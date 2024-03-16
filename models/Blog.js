const mongoose = require('mongoose');
const BlogsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }, // Assuming you have an Author model
  createdAt: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', BlogsSchema);
module.exports = Blog;
