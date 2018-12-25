const joi = require('joi');
const { ErrorHandler } = require('../../lib/utils');

const ABORT_EARLY = false;

function validateSchema(schema) {
  if (!schema.isJoi) {
    ErrorHandler.ServerError();
  }
}
async function validator(schema, data, next) {
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
      ErrorHandler.BadRequestError(errors);
    } else {
      throw error;
    }
  }
}

module.exports = validator;
