const Locations = require('../lib/repositories/locations');
const BaseController = require('./base');

class LocationsController extends BaseController {
  static async create(ctx) {
    await super.call(super.create, ctx, Locations);
  }

  static async get(ctx) {
    await super.call(super.get, ctx, Locations);
  }

  static async delete(ctx) {
    await super.call(super.delete, ctx, Locations);
  }

  static async update(ctx) {
    await super.call(super.update, ctx, Locations);
  }
}

module.exports = LocationsController;
