const boom = require('@hapi/boom');
const { config } = require('../../config');

function withErrorStack(error, stack) {
    const response = {
        status: 'ERROR',
        ...error
    };
    if (config.dev) {
        return {...response, stack };
    }
    return response;
}

function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}

function wraperError(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }
    next(err);
}

// eslint-disable-next-line no-unused-vars
function errorHanlder(err, req, res, next) {

    const { output: { statusCode, payload } } = err;

    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack))
}

module.exports = { logErrors, errorHanlder, wraperError }