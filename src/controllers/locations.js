const Locations = require('../lib/repositories/locations');
const BaseController = require('./base');
const { sendSuccess } = require('../lib/utils');
const { OK_CODE } = require('../constants');

class LocationsController extends BaseController {
  static async create(ctx) {
    await super.call(super.create, ctx, Locations);
  }

  static async get(ctx) {
    await super.call(super.get, ctx, Locations);
  }

  static async getAll(ctx) {
    await super.call(LocationsController._getAll, ctx);
  }

  static async delete(ctx) {
    await super.call(super.delete, ctx, Locations);
  }

  static async update(ctx) {
    await super.call(super.update, ctx, Locations);
  }

  static async _getAll(ctx) {
    const records = await Locations.getAll(ctx.db);
    sendSuccess(ctx, records, OK_CODE);
  }
}

module.exports = LocationsController;
