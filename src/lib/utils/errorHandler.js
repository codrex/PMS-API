const {
  SERVER_ERROR,
  SERVER_ERROR_CODE,
  NOT_FOUND_ERROR,
  NOT_FOUND,
  BAD_REQUEST_CODE,
} = require('../../constants');

class ErrorHandler extends Error {
  constructor(statusCode, message, ...args) {
    super(...args);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorHandler);
    }
    this.message = message;
    this.statusCode = statusCode;
  }

  static ServerError() {
    throw new ErrorHandler(SERVER_ERROR_CODE, SERVER_ERROR);
  }

  static ResourceNotFoundError(message = NOT_FOUND_ERROR) {
    throw new ErrorHandler(NOT_FOUND, message);
  }

  static BadRequestError(message) {
    throw new ErrorHandler(BAD_REQUEST_CODE, message);
  }
}

module.exports = ErrorHandler;
