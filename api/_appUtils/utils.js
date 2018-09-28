const { HTTP_STATUS } = require('./httpStatus');

// LODASH
const get = require('lodash/get');

class ArrangeResponse {
  constructor(dictionary, res) {
    this.dictionary = dictionary;
    this.res = res;
  }
  response (status, token) {
    const myJson = {
      message: this.dictionary !== undefined ?
        get(this.dictionary, get(status, 'MSG'), get(status, 'MSG')) :
        get(status, 'MSG')
    }
    if(token) myJson.token = token;
    return this.res.status(get(status, 'CODE')).json(myJson);
  }
}

const isOk = response => get(response, 'CODE') === HTTP_STATUS.SUCCESS.CODE;

module.exports.isOk = isOk;
module.exports.ArrangeResponse = ArrangeResponse;