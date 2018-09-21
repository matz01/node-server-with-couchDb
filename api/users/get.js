// LODASH
const get = require('lodash/get');

const authApiCall = require('../_appUtils/authApiCall')

const getUser = (req, res) => {
  authApiCall(req, res, (token)=>{
    res.status(200).send({message: 'ok, admin: ' + get(token, 'admin')});
  })

}

module.exports = getUser;