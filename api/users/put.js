// LODASH
const get = require('lodash/get');

// UTILS
const users = require('../_appUtils/couchdb').use('users');
const { putValidation } = require('./validation/putValidation');

const put = async(req, res) => {
  try {
    const validation = await putValidation(req, res);
    if(!validation) return;

    await users.insert(req.body);
    res.status(200).json({
      message: 'User added'
    });

  } catch (err) {
    res.status(500).json({
      message: get(err, 'message', 'error undefined')
    });
    throw e;
  }
}

module.exports = put;