const express = require('express');
const router = express.Router();
const Author = require('../models/author');
router.post('/', async (req, res) => {
  try {
    const { name, place} = req.body; 
    const author = new Author({ name, place}); 
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
