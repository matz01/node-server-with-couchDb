const { HTTP_STATUS } = require('../../_appUtils/httpStatus');

const USER_STATUS_DICTIONARY = {
  POST: {
    [HTTP_STATUS.SUCCESS.MSG]: 'Utente correttamente creato',
    [HTTP_STATUS.MISSING_PARAMETERS.MSG]: 'User e password sono obbligatori',
    [HTTP_STATUS.CONFLICT.MSG]: 'User già esistente',
    [HTTP_STATUS.GENERIC_ERROR.MSG]: "Ops! C'è stato un problema..."
  },
  GET: {
    [HTTP_STATUS.SUCCESS.MSG]: 'pk, hai una famiglia',
    [HTTP_STATUS.BAD_REQUEST.MSG]: 'Non hai ancora una famiglia',
    [HTTP_STATUS.GENERIC_ERROR.MSG]: "Ops! C'è stato un problema..."
  }
}

module.exports.USER_STATUS_DICTIONARY = USER_STATUS_DICTIONARY;