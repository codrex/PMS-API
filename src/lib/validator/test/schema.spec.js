const joi = require('joi');

const { locationCreate } = require('../schema');
const { createMockLocation } = require('../../../constants');

describe('schema', () => {
  describe('location', () => {
    it('should not throw an error', () => {
      const { parentLocation, ...data } = createMockLocation();
      expect(() => joi.assert(data, locationCreate)).not.toThrowError();
    });
    it('should throw an error when name is not a string', () => {
      const { parentLocation, ...data } = createMockLocation();
      data.name = 938494;
      expect(() => joi.assert(data, locationCreate)).toThrowError();
    });
    it('should throw an error when name is an empty string', () => {
      const { parentLocation, ...data } = createMockLocation();
      data.name = '         ';
      expect(() => joi.assert(data, locationCreate)).toThrowError();
    });
    it('should throw an error when maleResidents not a number', () => {
      const { parentLocation, ...data } = createMockLocation();
      data.maleResidents = '         ';
      expect(() => joi.assert(data, locationCreate)).toThrowError();
    });
    it('should throw an error when maleResidents a negative number', () => {
      const { parentLocation, ...data } = createMockLocation();
      data.maleResidents = -200;
      expect(() => joi.assert(data, locationCreate)).toThrowError();
    });
    it('should throw an error when maleResidents not an integer', () => {
      const { parentLocation, ...data } = createMockLocation();
      data.maleResidents = 8.01;
      expect(() => joi.assert(data, locationCreate)).toThrowError();
    });
    it('should throw an error when maleResidents undefined', () => {
      const { parentLocation, ...data } = createMockLocation();
      delete data.maleResidents;
      expect(() => joi.assert(data, locationCreate)).toThrowError();
    });
  });
});
