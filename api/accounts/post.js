const { HTTP_STATUS } = require('../_appUtils/httpStatus');

// UTILS
const users = require('../_appUtils/couchdb').use('families');

const post = async(req) => {
  try {
    await users.insert(req.body);
    return HTTP_STATUS.SUCCESS;
  } catch (err) {
    console.error(err);
    return HTTP_STATUS.GENERIC_ERROR;
  }
};

module.exports = post;