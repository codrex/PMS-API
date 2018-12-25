const requestHandler = require('../requestHandler');
const utils = require('../../lib/utils');

const ctx = {
  res: jest.fn(),
};
describe('requestHandler', () => {
  it('should throw an error when routes is not a function', () => {
    expect(requestHandler).toThrow();
  });
  it('should return a function', () => {
    const requestHandlerFn = requestHandler(jest.fn());
    expect(typeof requestHandlerFn).toBe('function');
  });
  it('should handle know errors', () => {
    const spy = jest.spyOn(utils, 'sendFailure');
    requestHandler(utils.ErrorHandler.BadRequestError)(ctx);
    expect(spy).toBeCalled();
  });

  it('should handle unknown errors', () => {
    const spy = jest.spyOn(utils, 'sendServerError');
    requestHandler(() => {
      throw new Error('error');
    })(ctx);
    expect(spy).toBeCalled();
  });
});
