const express = require('express');
const { usersMock } = require('../utils/mocks/usersMock')

function usersApi(app) {
    const router = express.Router();

    app.use('/api/users', router);

    router.get('/', async function(req, res, next) {
        try {
            const users = await Promise.resolve(usersMock);

            res.status(200).json({
                status: 'OK',
                message: 'users listed',
                data: users
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports = usersApi;