const boom = require('@hapi/boom');

function notFoundHandler(req, res) {
    const { output: { statusCode, payload } } = boom.badRequest;

    res.status(statusCode, payload);
}

module.exports = notFoundHandler;