const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Author = require('../models/author.js');
router.post('/', async (req, res) => {
  try {
    const { title, content, authorName, place} = req.body;

    let author = await Author.findOne({ name: authorName });
    if (!author) {
      author = new Author({ name: authorName, place});
      await author.save();
    }

    const newPost = new Blog({ title, content, author: author._id });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.find().populate('author');
    res.json(blogData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const requestedId = req.params.id;
    const blogPost = await Blog.findById(requestedId).populate('author');
    if (!blogPost) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.json(blogPost);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route to delete a blog post by id
router.delete('/:id', async (req, res) => {
  try {
    const requestedId = req.params.id;
    const deletedPost = await Blog.findByIdAndDelete(requestedId);
    if (!deletedPost) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route to update a blog post by id
router.put('/:id', async (req, res) => {
  try {
    const requestedId = req.params.id;
    const { title, content, author } = req.body;
    const updatedPost = await Blog.findByIdAndUpdate(
      requestedId,
      { title, content, author },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;