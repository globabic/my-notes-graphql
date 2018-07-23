const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  content: String,
  date: String
});

module.exports = mongoose.model('Note', noteSchema);
