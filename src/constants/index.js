const mock = require('./mock');

const PORT = process.env.PORT || 5500;
const LOCATION_NOT_FOUND_ERR_MSG = 'Location not found';

module.exports = {
  PORT,
  LOCATION_NOT_FOUND_ERR_MSG,
  ...mock,
};
