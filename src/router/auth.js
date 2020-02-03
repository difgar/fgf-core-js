const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');

const { config } = require('../config');

//Basic stratigy
require('../utils/auth/strategies/basic');

function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);

    router.post('/sign-in', async (req, res, next) => {
        const { apiKeyToken } = req.body;

        if (!apiKeyToken) {
            return next(boom.unauthorized('apiKeyToken is required'));
        }

        passport.authenticate('basic', (error, user) => {
            try {
                if (error || !user) {
                    return next(boom.unauthorized());
                }

                req.login(user, { session: false }, async (error) => {
                    if (error) {
                        return next(error);
                    }

                    const apiKey = await ApiKeysService.getApiKey({ token: apiKeyToken });

                    if (!apiKey) {
                        return next(boom.unauthorized());
                    }

                    const { _id: id, name, email } = user;
                    const payload = {
                        sub: id,
                        name,
                        email,
                        scopes: apiKey.scopes,
                    };
                    const token = jwt.sign(payload, config.authJwtSecret, { expiresIn: '15m' });

                    return res.status(200).json({ token, user: { id, name, email } });
                });
            } catch (error) {
                return next(error);
            }
            return next();
        })(req, res, next);
        return next();
    });
}

module.exports = authApi;
