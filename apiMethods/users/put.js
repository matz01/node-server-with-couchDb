const users = require('../_utils/couchdb').use('users');

// LODASH
const get = require('lodash/get');

const { invalidDataCheck } = require('./_utils/utils.js');
const { duplicatedUserCheck } = require('./_utils/process.js');

const put = async(req, res) => {
  try {
    const invalidDataCheck_response = invalidDataCheck(req);
    if (invalidDataCheck_response !== false) {
      return res.status(invalidDataCheck_response.status).json({
        message: invalidDataCheck_response.message
      });
    }

    const error_duplication = await duplicatedUserCheck(req);
    if (error_duplication !== false) {
      return res.status(error_duplication.status).json({
        message: error_duplication.message
      });
    }

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