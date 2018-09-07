const { invalidDataCheck } = require('../../../apiMethods/users/_utils/utils.js');

describe('apiMethods/users/_utils/utils.verifyRequest\n' +
  'check correct data for adding user', () => {

  test('password = abcdefghi & user = 12345678\n' +
    'to equal null (ok)', () => {
    const data = {
      body:{
        user: 'abcdefghi',
        password: '12345678'
      }
    };

    expect(invalidDataCheck(data)).toBe(false);
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
    expect(invalidDataCheck(data)).toEqual(expected);
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
    expect(invalidDataCheck(data)).toEqual(expected);
  });

});