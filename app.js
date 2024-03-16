const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { mongoURI } = require('./config');
const path = require('path');
const dbName = 'blogdb'; 
const app = express();
const blogRoutes = require('./routes/blogRoutes');
const authorRoutes = require('./routes/authorRoutes'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(mongoURI, { dbName })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));
app.use('/blogs', blogRoutes);
app.use('/authors', authorRoutes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});