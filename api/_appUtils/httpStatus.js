const HTTP_STATUS = {
  SUCCESS: {
    CODE: 200,
    MSG: 'success',
  },
  MISSING_PARAMETERS: {
    CODE: 400,
    MSG: 'missing_params',
  },
  BAD_REQUEST: {
    CODE: 400,
    MSG: 'bad_request',
  },
  CONFLICT: {
    CODE: 409,
    MSG: 'conflict',
  },
  GENERIC_ERROR: {
    CODE: 500,
    MSG: 'generic_error',
  }
}

module.exports.HTTP_STATUS = HTTP_STATUS;