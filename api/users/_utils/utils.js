// LODASH
const get = require('lodash/get');

const invalidDataCheck = (req) => {
  const user = get(req.body, 'user');
  const pwd = get(req.body, 'password');
  if(user === undefined || pwd === undefined){
    return { status: 400, message: 'Missing mandatory fields'}
  }
  if(user.length < 8 || pwd.length < 8 ){
    return { status: 400, message: 'Incorrect request: user or password are too short'}
  }
  return false;
}

module.exports.invalidDataCheck = invalidDataCheck;