'use strict';
require('dotenv').config();
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');

// API METHODS
const getUser = require('./apiMethods/users/get');
const putUser = require('./apiMethods/users/put');

router.route('/user')
  .get((req, res) => getUser(req, res))
  .post((req, res) => putUser(req, res));

router.route('/getauthdata')
  .get(function (req, res) {

    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

      res.status(200).send(decoded);

      console.log('getauthdata')
      res.json({message: 'authdata'});

    });
  });

router.route('/auth')
  .post(function (req, res) {
    console.log('token cretated')

    const payload = {
      admin: "superman"
    };
    const token = jwt.sign(payload, app.get('superSecret'), {
      expiresIn: '10 hours'
    });

    // return the information including token as JSON
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });

  });

module.exports = router;