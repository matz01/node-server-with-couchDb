const { userValidation } = require('../../../api/users/_utils/dataValidation');
const HTTP_STATUS = require('../../../api/_appUtils/httpStatus');

describe('api/users/_appUtils/utils.verifyRequest\n' +
  'check correct data for adding user', () => {

  test('password = abcdefghi & user = 12345678\n' +
    'to equal null (ok)', () => {
    const data = {
      body:{
        user: 'abcdefghi',
        password: '12345678'
      }
    };

    expect(userValidation(data)).toBe(HTTP_STATUS.SUCCESS);
  });

  test('password = abcdefg & user = 1234567\n' +
    'to equal 400, Incorrect request', () => {
    const data = {
      body:{
        user: 'abcdefg',
        password: '123456'
      }
    };
    const expected =
      {
        message: "Incorrect request: user or password are too short",
        status: 400
      };
    expect(userValidation(data)).toEqual(HTTP_STATUS.SUCCESS);
  });

  test('password = abcdefg & user = 1234567\n' +
    'to equal 400, Missing params', () => {
    const data = {
      body:{}
    };
    const expected =
      {
        message: "Missing mandatory fields",
        status: 400
      };
    expect(userValidation(data)).toEqual(HTTP_STATUS.MISSING_PARAMETERS);
  });

});