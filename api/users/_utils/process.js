const couch = require('../../_appUtils/couchdb');

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
      return{
        status: 409,
        message: 'User already exist'
      };
    }
    return false;
  } catch (e) {
    throw e;
  }
}

module.exports.duplicatedUserCheck = duplicatedUserCheck;