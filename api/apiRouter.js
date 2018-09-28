'use strict';
require('dotenv').config();
const express = require('express')
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');



// API METHODS
const getUser = require('./users/get');
const postUser = require('./users/post');

apiRouter.route('/user')
  .get((req, res) => getUser(req, res))
  .post((req, res) => postUser(req, res));



apiRouter.route('/auth')
  .post(function (req, res) {
    console.log('token cretated')

    const payload = {
      admin: "superman"
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '10 hours'
    });

    // return the information including token as JSON
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });

  });

module.exports = apiRouter;