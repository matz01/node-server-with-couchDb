const users = require('../../_appUtils/couchdb').use('users');
const { HTTP_STATUS } = require('../../_appUtils/httpStatus');

// LODASH
const get = require('lodash/get');

// UTILS
const { duplicatedUserCheck } = require('../_utils/process');
const { isOk } = require('../../_appUtils/utils');
const { userValidation } = require('../_utils/dataValidation');


const post = async(req, res) => {
  const dataValidation = userValidation(get(req, 'body'));
  if(!isOk(dataValidation)) return dataValidation;
  try {
    return await duplicatedUserCheck(req);
  } catch (e) {
    console.error(e);
    return HTTP_STATUS.GENERIC_ERROR;
  }
};

module.exports.postValidation = post;