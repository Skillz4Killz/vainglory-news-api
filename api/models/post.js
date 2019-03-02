const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  messageID: { type: String, required: true },
  channelID: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  title: String,
});

module.exports = mongoose.model('Post', postSchema);
