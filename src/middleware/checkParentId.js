const Locations = require('../lib/repositories/locations');
const { sendFailure, sendServerError } = require('../lib/utils');
const { NOT_FOUND, PARENT_LOC_NOT_FOUND } = require('../constants');

async function checkParentId(ctx, next) {
  try {
    const { parentLocation } = ctx.request.body;
    const { db } = ctx;
    if (parentLocation) {
      const parent = await Locations.get(db, parentLocation);
      if (!parent) {
        return sendFailure(ctx, PARENT_LOC_NOT_FOUND, NOT_FOUND);
      }
    }
    await next();
  } catch (error) {
    sendServerError(ctx);
  }
}

module.exports = checkParentId;
