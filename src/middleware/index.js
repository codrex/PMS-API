const validator = require('../lib/validator');
const { locationCreate, locationUpdate } = require('../lib/validator/schema');

async function validateCreateLocation(ctx, next) {
  const data = ctx.request.body;
  await validator(locationCreate, data, ctx, next);
}

async function validateUpdateLocation(ctx, next) {
  const data = ctx.request.body;
  await validator(locationUpdate, data, ctx, next);
}

module.exports = {
  validateCreateLocation,
  validateUpdateLocation,
};
