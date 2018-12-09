const Router = require('koa-router');
const LocationsController = require('../../controllers/locations');
const {
  validateCreateLocation,
  validateUpdateLocation,
  updateParent,
  checkParentId,
} = require('../../middleware');

const locations = new Router();

locations.post(
  '/location',
  validateCreateLocation,
  checkParentId,
  LocationsController.create,
);
locations.patch('/:id', validateUpdateLocation, LocationsController.update);
locations.delete('/:id', updateParent, LocationsController.delete);
locations.get('/:id', LocationsController.get);
locations.get('/', LocationsController.getAll);

module.exports = locations;
