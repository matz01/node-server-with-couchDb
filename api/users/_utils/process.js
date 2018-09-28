const couch = require('../../_appUtils/couchdb');
const { HTTP_STATUS } = require('../../_appUtils/httpStatus');

// LODASH
const get = require('lodash/get');

const users = couch.db.use('users');

const duplicatedUserCheck = async (req) => {
  const q = {
    selector: {
      user: { "$eq": get(req, 'body.user')},
    },
    limit:50
  };
  try{
    const response = await users.find(q)
    if(response.docs.length > 0) {
      return HTTP_STATUS.CONFLICT
    }
    return HTTP_STATUS.SUCCESS;
  } catch (e) {
    console.error(e);
    return HTTP_STATUS.GENERIC_ERROR;
  }
};

module.exports.duplicatedUserCheck = duplicatedUserCheck;
