const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet')();
const morgan = require('koa-morgan');
const fs = require('fs');

const routes = require('./routes');
const db = require('../db/models');
const { sendFailure } = require('../lib/utils');
const { NOT_FOUND, ROUTE_NOT_FOUND } = require('../constants');
const requestHandler = require('../middleware/requestHandler');

const accessLogStream = fs.createWriteStream('access.log', {
  flags: 'a',
});
const app = new Koa();
const bodyParser = new BodyParser();

app.context.db = db;

app.use(bodyParser);
app.use(helmet);
app.use(morgan('combined', { stream: accessLogStream }));
app.use(requestHandler(routes.routes()));

app.use(async (ctx) => {
  sendFailure(ctx, ROUTE_NOT_FOUND, NOT_FOUND);
});

module.exports = app;
