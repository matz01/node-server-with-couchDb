const users = require('../../_appUtils/couchdb').use('users');

const { invalidDataCheck } = require('../_utils/utils.js');
const { duplicatedUserCheck } = require('../_utils/process.js');

const putValidation = async(req, res) => {
  try {
    const dataCheck_response = invalidDataCheck(req);
    if (dataCheck_response !== false) {
      res.status(dataCheck_response.status).json({
        message: dataCheck_response.message
      });
      return false
    }

    const duplicationCheck_response = await duplicatedUserCheck(req);
    if (duplicationCheck_response !== false) {
      res.status(duplicationCheck_response.status).json({
        message: duplicationCheck_response.message
      });
      return false
    }
    return true

  } catch (e) {
    throw e;
  }
};

module.exports.putValidation = putValidation;