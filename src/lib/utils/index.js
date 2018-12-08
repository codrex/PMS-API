const {
  SERVER_ERROR,
  SERVER_ERROR_CODE,
  OK_CODE,
  BAD_REQUEST_CODE,
} = require('../../constants');

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
  const { femaleResidents, maleResidents } = location;
  // eslint-disable-next-line
  location.totalResidents = femaleResidents + maleResidents;
  return location;
}

module.exports = {
  setTotalResidents,
  sendServerError,
  sendFailure,
  sendSuccess,
  buildMsg,
};
