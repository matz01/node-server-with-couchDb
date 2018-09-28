const { HTTP_STATUS } = require('../../_appUtils/httpStatus');

// LODASH
const get = require('lodash/get');

const userValidation = data => {
  if (get(data, 'user') === undefined) {
    return HTTP_STATUS.MISSING_PARAMETERS;
  }
  if (get(data, 'password') === undefined) {
    return HTTP_STATUS.MISSING_PARAMETERS;
  }
  return HTTP_STATUS.SUCCESS;
};

module.exports.userValidation = userValidation;