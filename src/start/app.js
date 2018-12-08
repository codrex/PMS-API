const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet')();
const morgan = require('koa-morgan');
const fs = require('fs');

const routes = require('./routes');
const db = require('../db/models');

const accessLogStream = fs.createWriteStream('access.log', {
  flags: 'a',
});
const app = new Koa();
const bodyParser = new BodyParser();

app.context.db = db;

app.use(bodyParser);
app.use(helmet);
app.use(morgan('combined', { stream: accessLogStream }));
app.use(routes.routes(), routes.allowedMethods());

module.exports = app;
