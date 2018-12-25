const Locations = require('../lib/repositories/locations');
const BaseController = require('./base');
const { sendSuccess } = require('../lib/utils');
const { OK_CODE } = require('../constants');

class LocationsController extends BaseController {
  static async create(ctx) {
    await super.create(ctx, Locations);
  }

  static async get(ctx) {
    await super.get(ctx, Locations);
  }

  static async delete(ctx) {
    await super.delete(ctx, Locations);
  }

  static async update(ctx) {
    await super.update(ctx, Locations);
  }

  static async getAll(ctx) {
    await LocationsController._getAll(ctx);
  }

  static async _getAll(ctx) {
    const records = await Locations.getAll(ctx.db);
    sendSuccess(ctx, records, OK_CODE);
  }
}

module.exports = LocationsController;
