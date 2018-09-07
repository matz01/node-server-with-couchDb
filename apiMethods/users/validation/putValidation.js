const users = require('../../_utils/couchdb').use('users');

const { invalidDataCheck } = require('../_utils/utils.js');
const { duplicatedUserCheck } = require('../_utils/process.js');

const putValidation = async(req, res) => {
  try {
    const invalidDataCheck_response = invalidDataCheck(req);
    if (invalidDataCheck_response !== false) {
      res.status(invalidDataCheck_response.status).json({
        message: invalidDataCheck_response.message
      });
      return false
    }

    const error_duplication = await duplicatedUserCheck(req);
    if (error_duplication !== false) {
      res.status(error_duplication.status).json({
        message: error_duplication.message
      });
      return false
    }
    return true

  } catch (e) {
    throw e;
  }
}

module.exports.putValidation = putValidation;