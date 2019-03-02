const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Product = require('../models/post');

const findOneError = {
  error: {
    status: 404,
    message: 'The message ID that you provided was not found in the database.',
  },
};
const findError = {
  error: {
    status: 404,
    message: 'An error has occurred while trying to fetch all the posts.',
  },
};

// Get all the posts
router.get('/', (req, res, next) => {
  Product.find((error, docs) => {
    console.log(error);
    res
      .status(error ? error.status || 404 : 200)
      .json(error ? error || findError : docs);
  });
});

router.get('/:messageID', (req, res, next) => {
  const id = req.params.messageID;
  Product.findOne({ messageID: id }, (err, doc) => {
    // Boolean for did the request complete successfully or have an error
    const success = !!doc;

    // Send the document if it was found or return an error response saying the message id doesnt exist in db.
    res.status(success ? 200 : 404).json(success ? doc : findOneError);
  });
});

router.post('/', (req, res, next) => {
  const post = new Product({
    _id: new mongoose.Types.ObjectId(),
    id: req.body.id,
    author: req.body.author,
    category: req.body.category,
    image: req.body.image,
    link: req.body.link,
    messageID: req.body.messageID,
    channelID: req.body.channelID,
    title: req.body.title,
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Created a new post in the database successfully.',
        createdPost: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});

// Update a document by message id
router.patch('/', async (req, res, next) => {
  const id = req.params.messageID;
  const doc = Product.findOne({ messageID: id });
  // For each paramater provided update the document
  for (const [key, value] of Object.entries(req.body)) doc[key] = value;
  // Save the document to the database
  await doc.save();
});

router.delete('/', (req, res, next) => {
  const id = req.params.messageID;
  const deletedResponse = `The document with messageID of ${messageID} has been removed from the database.`;

  Product.remove({ messageID: id }, (error) => {
    res
      .status(error ? error.status || 404 : 200)
      .json(error ? error || findError : deletedResponse);
  });
});

module.exports = router;
