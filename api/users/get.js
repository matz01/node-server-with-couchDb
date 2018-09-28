// LODASH
const get = require('lodash/get');
const jwt = require('jsonwebtoken');

//const authApiCall = require('../_appUtils/authApiCall')

/*

const getUser = (req, res) => {
  authApiCall(req, res, (token)=>{
    res.status(200).send({message: 'ok, admin: ' + get(token, 'admin')});
  })
}

const getUser = (req, res) => {
  authApiCall(req, res, (token)=>{
    res.status(200).send({message: 'ok, admin: ' + get(token, 'admin')});
  })
}

*/

const { HTTP_STATUS } = require('../_appUtils/httpStatus');
const { ArrangeResponse } = require('../_appUtils/utils');
const { USER_STATUS_DICTIONARY } = require('./_utils/userStatusDictionary');

// UTILS
const users = require('../_appUtils/couchdb').use('users');

const getUser = async(req, res) => {
  const arrangeResponse = new ArrangeResponse(USER_STATUS_DICTIONARY.GET, res);
  try {
    const q = {
      selector: {
        user: { "$eq": get(req, 'headers.user')},
        password: { "$eq": get(req, 'headers.password')},
      },
      limit:50
    };

    const getResponse = await users.find(q)
    if(get(getResponse, 'docs', []).length === 1){
      const payload = {
        admin: "spiderman"
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


module.exports = getUser;