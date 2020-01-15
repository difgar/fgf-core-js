const express = require('express');
const UsersService = require('../services/users');

function usersApi(app) {
    const router = express.Router();
    const usersService = new UsersService();
    app.use('/api/users', router);

    router.get('/', async function(req, res, next) {
        try {
            const users = await usersService.getUsers();

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