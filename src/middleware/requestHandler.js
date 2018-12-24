const utils = require('../lib/utils');

function requestHandler(routes) {
  if (typeof routes !== 'function') {
    throw new Error('routes must be a function');
  }
  return async (ctx, next) => {
    try {
      await routes(ctx, next);
    } catch (error) {
      if (error instanceof utils.ErrorHandler) {
        utils.sendFailure(ctx, error.message, error.statusCode);
      } else {
        utils.sendServerError(ctx);
      }
    }
  };
}

module.exports = requestHandler;
