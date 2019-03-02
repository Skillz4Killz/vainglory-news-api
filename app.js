const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');

const postRoutes = require('./api/routes/posts');

// Connect to the MongoDB
mongoose.connect(config.mongoDBLogin, { useNewUrlParser: true });

// Logger
app.use(morgan('dev'));
// Make body of requests be easily readed
app.use(express.json());
// CORS Handling
app.use((req, res, next) => {
  res
    .header('Access-Control-Allow-Origin', '*')
    .header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  // Tell the browser which methods will be allowed
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
    // Empty json because no need to go to routes for this
    return res.status(200).json({});
  }
  // If needed continue
  next();
});
// Valid routes that will handle requests
app.use('/posts', postRoutes);

// Error handler for invalid routes
app.use((req, res, next) => {
  const error = new Error('Not Found!');
  error.status = 404;
  next(error);
});

// Handle any and all errors
app.use((error, req, res, next) => {
  // Logs all errors happening so they can be debugged
  // console.log(error);
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.toString(),
    },
  });
});

module.exports = app;
