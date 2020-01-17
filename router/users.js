const express = require('express');
const UsersService = require('../services/users');
const { userIdSchema, createUserSchema } = require('../utils/schemas/users');
const validationHandler = require('../utils/middleware/validationHandler');


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

    router.get('/:userId', validationHandler(userIdSchema, 'params'), async function(req, res, next) {
        const { userId } = req.param;
        try {
            const users = await usersService.getUser({ userId });

            res.status(200).json({
                status: 'OK',
                message: 'user listed',
                data: users
            });
        } catch (error) {
            next(error);
        }
    });

    router.post('/', validationHandler(createUserSchema, 'body'), async function(req, res, next) {
        const { body: user } = req;
        try {
            const userId = await usersService.createUser({ user });

            res.status(200).json({
                status: 'OK',
                message: `user '${userId}' created`,
                data: userId
            });
        } catch (error) {
            next(error);
        }
    });

    router.put('/:userId', validationHandler(userIdSchema, 'params'), validationHandler(createUserSchema, 'body'), async function(req, res, next) {
        const { body: user } = req;
        const { userId } = req.param;
        try {
            const newUserId = await usersService.updateUser({ userId, user });

            res.status(200).json({
                status: 'OK',
                message: `user '${newUserId}' updated`,
                data: userId
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports = usersApi;