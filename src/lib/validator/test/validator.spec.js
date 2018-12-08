const validator = require('../');
const { locationCreate } = require('../schema');
const utils = require('../../utils');

const { createMockLocation } = require('../../../constants');

const ctx = { throw: jest.fn(), request: {}, response: { body: {} } };
const next = jest.fn();
describe('validator', () => {
  it('should validate location data and call next when data is valid', async () => {
    const { parentLocation, ...data } = createMockLocation();
    await validator(locationCreate, data, ctx, next);
    expect(next).toBeCalledTimes(1);
  });

  it('should respond with an error object when data is invalid', async () => {
    const spy = jest.spyOn(utils, 'sendFailure').mockImplementation(jest.fn());
    await validator(locationCreate, {}, ctx, next);
    expect(spy).toBeCalledTimes(1);
  });

  it('should respond with server error when an error occurs', async () => {
    const spy = jest
      .spyOn(utils, 'sendServerError')
      .mockImplementation(jest.fn());
    await validator('schema', {}, {}, ctx);
    expect(spy).toBeCalledTimes(1);
  });
});
