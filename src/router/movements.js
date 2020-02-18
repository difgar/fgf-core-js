const express = require('express');
const MovementsService = require('../services/movements');

//JWT stratigy
require('../utils/auth/strategies/jwt');

function usersApi(app) {
    const router = express.Router();
    app.use('/api/movements', router);

    router.get('/:accountId/:period',
        async (req, res, next) => {
            try {
                const { accountId, period } = req.params;

                const accounts = await MovementsService.getMovementsByPeriod(accountId, period);

                res.status(200).json({
                    status: 'OK',
                    message: 'movements by period listed',
                    data: accounts,
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = usersApi;
