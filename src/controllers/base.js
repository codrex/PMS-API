const pushid = require('pushid');

const { buildMsg, ErrorHandler, sendSuccess } = require('../lib/utils');
const {
  RESOURCE_CREATED_CODE,
  OK_CODE,
  NOT_FOUND_ERROR,
  RESOURCE_DELETED,
} = require('../constants');

class BaseController {
  static async create(ctx, model) {
    const { body } = ctx.request;
    body.id = pushid();
    const record = await model.create(ctx.db, body);
    sendSuccess(ctx, record, RESOURCE_CREATED_CODE);
  }

  static async get(ctx, model) {
    const {
      params: { id },
    } = ctx;
    const record = await model.get(ctx.db, id);
    if (record) {
      sendSuccess(ctx, record, OK_CODE);
    } else {
      ErrorHandler.ResourceNotFoundError(buildMsg(NOT_FOUND_ERROR));
    }
  }

  static async delete(ctx, model) {
    const {
      params: { id },
    } = ctx;
    const deleteCount = await model.delete(ctx.db, id);
    if (deleteCount) {
      sendSuccess(ctx, buildMsg(RESOURCE_DELETED), OK_CODE);
    } else {
      ErrorHandler.ResourceNotFoundError(buildMsg(NOT_FOUND_ERROR));
    }
  }

  static async update(ctx, model) {
    const {
      params: { id },
    } = ctx;
    const { body } = ctx.request;
    const record = await model.update(ctx.db, id, body);
    if (record) {
      sendSuccess(ctx, record, OK_CODE);
    } else {
      ErrorHandler.ResourceNotFoundError(buildMsg(NOT_FOUND_ERROR));
    }
  }
}

module.exports = BaseController;
