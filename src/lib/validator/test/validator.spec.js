const validator = require('../');
const { locationCreate } = require('../schema');

const { createMockLocation } = require('../../../constants');

const next = jest.fn();
describe('validator', () => {
  it('should validate location data and call next when data is valid', async () => {
    const { parentLocation, ...data } = createMockLocation();
    await validator(locationCreate, data, next);
    expect(next).toBeCalledTimes(1);
  });

  it('should throw an error when data is invalid', async () => {
    await expect(validator(locationCreate, {}, next)).rejects.toThrow();
  });

  it('should throw an error when an error occurs', async () => {
    await expect(validator('schema', {}, {})).rejects.toThrow();
  });
});
