const mongoose = require('mongoose');

const authorsSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  place: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Author', authorsSchema);
