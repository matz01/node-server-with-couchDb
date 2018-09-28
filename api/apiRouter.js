'use strict';
require('dotenv').config();
const express = require('express')
const apiRouter = express.Router();

// USER API METHODS
const getUser = require('./users/get');
const postUser = require('./users/post');

apiRouter.route('/user')
  .get((req, res) => getUser(req, res))
  .post((req, res) => postUser(req, res));

module.exports = apiRouter;