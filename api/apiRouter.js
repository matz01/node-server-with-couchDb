'use strict';
require('dotenv').config();
const express = require('express')
const apiRouter = express.Router();

// USER API METHODS
const getUser = require('./users/get');
const postUser = require('./users/post');
const getAccount = require('./accounts/get')

apiRouter.route('/user')
  .get((req, res) => getUser(req, res))
  .post((req, res) => postUser(req, res));

apiRouter.route('/account')
  .get((req, res) => getAccount(req, res))

module.exports = apiRouter;