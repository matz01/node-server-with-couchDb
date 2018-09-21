'use strict';
require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = process.env.PORT;        // set our port
app.listen(port);

// API
const apiRouter = require('./api/apiRouter.js');
app.use('/api', apiRouter);

// PUBLIC
app.use('/resources',
  express.static(__dirname + '/public/resources')
);

// STATIC FILES
const staticRouter = express.Router();
staticRouter.get('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/', staticRouter);

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})




