const { config } = require('../../config');

function withErrorStack(error, stack) {
    const response = {
        status: 'ERROR',
        message: error
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

// eslint-disable-next-line no-unused-vars
function errorHanlder(err, req, res, next) {
    res.status(err.status || 500);
    res.json(withErrorStack(err.message, err.stack))
}

module.exports = { logErrors, errorHanlder }