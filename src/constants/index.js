const mock = require('./mock');

const PORT = process.env.PORT || 5500;
const LOCATION_NOT_FOUND_ERR_MSG = 'Location not found';
const LOCATIONS_ROUTES = {
  create: '/locations/location',
  others: '/locations/',
};

const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 403;
const OK_CODE = 200;
const RESOURCE_CREATED_CODE = 201;
const NOT_FOUND = 404;
const SERVER_ERROR_CODE = 500;
const NOT_FOUND_ERROR = 'Resource not found';
const SERVER_ERROR = 'Server error occurred';
const UNIQUE_CONSTRAINT_ERR = 'SequelizeUniqueConstraintError';
const RESOURCE_DELETED = 'Resource deleted';

module.exports = {
  PORT,
  LOCATION_NOT_FOUND_ERR_MSG,
  LOCATIONS_ROUTES,
  SERVER_ERROR,
  BAD_REQUEST_CODE,
  SERVER_ERROR_CODE,
  OK_CODE,
  NOT_FOUND,
  UNIQUE_CONSTRAINT_ERR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_CODE,
  RESOURCE_DELETED,
  RESOURCE_CREATED_CODE,
  ...mock,
};
