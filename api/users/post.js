const { HTTP_STATUS } = require('../_appUtils/httpStatus');
const { ArrangeResponse } = require('../_appUtils/utils');
const { USER_STATUS_DICTIONARY } = require('./_utils/userStatusDictionary');

// UTILS
const users = require('../_appUtils/couchdb').use('users');
const { postValidation } = require('./validation/post');
const { isOk } = require('../_appUtils/utils');

const post = async(req, res) => {
  const arrangeResponse = new ArrangeResponse(USER_STATUS_DICTIONARY.POST, res);
  try {
    const validation = await postValidation(req);
    if(!isOk(validation)) {
      return arrangeResponse.response(validation);
    }
    await users.insert(req.body);
    return arrangeResponse.response(HTTP_STATUS.SUCCESS);
  } catch (err) {
    console.error(err);
    return arrangeResponse.response(HTTP_STATUS.GENERIC_ERROR);
  }
};

module.exports = post;