const express = require('express');
const AccountsService = require('../services/accounts');

//JWT stratigy
require('../utils/auth/strategies/jwt');

function usersApi(app) {
    const router = express.Router();
    app.use('/api/accounts', router);

    router.get('/',
        async (req, res, next) => {
            try {
                const accounts = await AccountsService.getAccounts();

                res.status(200).json({
                    status: 'OK',
                    message: 'accounts listed',
                    data: accounts,
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = usersApi;
