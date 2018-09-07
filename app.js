'use strict';
const createDbs = require('./init_couch');

function runTest () {
  createDbs();
  console.log('ready!');
}

runTest();

