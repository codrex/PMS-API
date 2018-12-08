const Router = require('koa-router');
const LocationsController = require('../../controllers/locations');
const {
  validateCreateLocation,
  validateUpdateLocation,
} = require('../../middleware');

const locations = new Router();

locations.post('/location', validateCreateLocation, LocationsController.create);
locations.patch('/:id', validateUpdateLocation, LocationsController.update);
locations.delete('/:id', LocationsController.delete);
locations.get('/:id', LocationsController.get);

module.exports = locations;
