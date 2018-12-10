const Router = require('koa-router');
const locations = require('./locations');

const routes = new Router();
routes.use('/api/v1/locations', locations.routes(), locations.allowedMethods());

module.exports = routes;
