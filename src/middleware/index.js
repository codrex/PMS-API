const validator = require('../lib/validator');
const { locationCreate, locationUpdate } = require('../lib/validator/schema');
const updateParent = require('./updateParent');
const checkParentId = require('./checkParentId');

async function validateCreateLocation(ctx, next) {
  const data = ctx.request.body;
  await validator(locationCreate, data, next);
}

async function validateUpdateLocation(ctx, next) {
  const data = ctx.request.body;
  await validator(locationUpdate, data, next);
}

module.exports = {
  validateCreateLocation,
  validateUpdateLocation,
  updateParent,
  checkParentId,
};
