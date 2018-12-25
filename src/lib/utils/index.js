const {
  SERVER_ERROR,
  SERVER_ERROR_CODE,
  OK_CODE,
  BAD_REQUEST_CODE,
} = require('../../constants');
const ErrorHandler = require('./errorHandler');

function sendSuccess(ctx, data, statusCode = OK_CODE) {
  ctx.status = statusCode;
  ctx.body = {
    success: true,
    data,
  };
}

function sendFailure(ctx, error, statusCode = BAD_REQUEST_CODE) {
  ctx.status = statusCode;
  ctx.body = {
    success: false,
    error,
  };
}

function sendServerError(ctx, statusCode = SERVER_ERROR_CODE) {
  sendFailure(ctx, SERVER_ERROR, statusCode);
}

function buildMsg(data) {
  return { message: data };
}

function setTotalResidents(location) {
  /* eslint-disable */
  const { femaleResidents, maleResidents } = location;
  location.dataValues.femaleResidents = Number(femaleResidents);
  location.dataValues.maleResidents = Number(maleResidents);
  location.dataValues.totalResidents =
    Number(femaleResidents) + Number(maleResidents);
  return location;
}

module.exports = {
  setTotalResidents,
  sendServerError,
  sendFailure,
  sendSuccess,
  buildMsg,
  ErrorHandler,
};
