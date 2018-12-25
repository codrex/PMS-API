const Locations = require('../lib/repositories/locations');
const { ErrorHandler } = require('../lib/utils');
const { PARENT_LOC_NOT_FOUND } = require('../constants');

async function checkParentId(ctx, next) {
  try {
    const { parentLocation } = ctx.request.body;
    const { db } = ctx;
    if (parentLocation) {
      const parent = await Locations.get(db, parentLocation);
      if (!parent) {
        return ErrorHandler.ResourceNotFoundError(PARENT_LOC_NOT_FOUND);
      }
    }
    await next();
  } catch (error) {
    return ErrorHandler.ServerError();
  }
}

module.exports = checkParentId;
