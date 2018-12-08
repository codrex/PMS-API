const joi = require('joi');
const { SERVER_ERROR } = require('../../constants');
const utils = require('../../lib/utils');

const ABORT_EARLY = false;

function validateSchema(schema) {
  if (!schema.isJoi) {
    throw new Error(SERVER_ERROR);
  }
}
async function validator(schema, data, ctx, next) {
  try {
    validateSchema(schema);
    await joi.validate(data, schema, { abortEarly: ABORT_EARLY });
    if (next) {
      await next();
    }
  } catch (error) {
    const { details } = error;
    if (details) {
      const errors = details.map(({ path, message }) => ({
        [path]: message,
      }));
      utils.sendFailure(ctx, errors);
    } else {
      utils.sendServerError(ctx);
    }
  }
}

module.exports = validator;
