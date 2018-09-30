const jwt = require('jsonwebtoken');

const { HTTP_STATUS } = require('../_appUtils/httpStatus');
const { ArrangeResponse } = require('../_appUtils/utils');
const { USER_STATUS_DICTIONARY } = require('./_utils/userStatusDictionary');

// LODASH
const get = require('lodash/get');

// UTILS
const accounts = require('../_appUtils/couchdb').use('accounts');

const getAccount = async(req, res) => {
  const arrangeResponse = new ArrangeResponse(USER_STATUS_DICTIONARY.GET, res);
  if(!apiSession.logged) return arrangeResponse.response(HTTP_STATUS.UNAUTHORIZED);
  try {
    const q = {
      selector: {
        user: { "$eq": apiSession.user },
      },
      limit:50
    };
    const getAccountResponse = await accounts.find(q);
    if(get(getAccountResponse, 'docs', []).length === 1){
      const payload = {
        family: get(getAccountResponse, 'docs', [])[0]
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '10 hours'
      });
      return arrangeResponse.response(HTTP_STATUS.SUCCESS, token);
    }
    return arrangeResponse.response(HTTP_STATUS.BAD_REQUEST);
  } catch (err) {
    console.error(err);
    return arrangeResponse.response(HTTP_STATUS.GENERIC_ERROR);
  }
};

module.exports = getAccount;