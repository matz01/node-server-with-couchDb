// LODASH
const get = require('lodash/get');

const { HTTP_STATUS } = require('../_appUtils/httpStatus');
const { ArrangeResponse } = require('../_appUtils/utils');
const { USER_STATUS_DICTIONARY } = require('./_utils/userStatusDictionary');

// UTILS
const users = require('../_appUtils/couchdb').use('users');

/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
questo trasforma la chiamata in una chiamata autenticata
const authApiCall = require('../_appUtils/authApiCall')
const getUser = (req, res) => {
  authApiCall(req, res, (token)=>{
    res.status(200).send({message: 'ok, admin: ' + get(token, 'admin')});
  })
}
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/

const getUser = async(req, res) => {
  const arrangeResponse = new ArrangeResponse(USER_STATUS_DICTIONARY.GET, res);
  try {
    const user = get(req, 'headers.user');
    const password = get(req, 'headers.password');
    const q = {
      selector: {
        user: { "$eq": user },
        password: { "$eq": password },
      },
      limit:50
    };

    const getResponse = await users.find(q)
    if(get(getResponse, 'docs', []).length === 1){
      setSessionLogin(user);
      return arrangeResponse.response(HTTP_STATUS.SUCCESS);
    }
    return arrangeResponse.response(HTTP_STATUS.BAD_REQUEST);
  } catch (err) {
    console.error(err);
    return arrangeResponse.response(HTTP_STATUS.GENERIC_ERROR);
  }
};

setSessionLogin = (user) => {
  apiSession.logged = true;
  apiSession.user = user;
}


module.exports = getUser;