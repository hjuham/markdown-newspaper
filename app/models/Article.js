const mongoose = require('mongoose')
const topics = require('../utils/tags')
//Schema that imports usable topics. Requests are set to 0 by default and increased by getSingleArticle.
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Article must have a title'],
  },
  author: {
    type: String,
    required: false
  },
  imageURL: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  tags: [{
    type: String,
    enum: topics,
    required: [true, 'Article must have one or more tags'],
  }],
  weight: {
    type: Number,
    require: [true, 'Article must have a weight']
  },
  content: {
    type: String,
    required: [true, 'Article must have content']
  },
  requests: {
    type: Number,
    default: 0,
    required: false
  }
  
},{ timestamps: true })

module.exports = mongoose.model('Article', articleSchema)
