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

    router.post('/sign-in', (req, res, next) => {
        const { apiKeyToken } = req.body;
        try {
            if (!apiKeyToken) {
                return next(boom.unauthorized('apiKeyToken is required'));
            }
            return passport.authenticate('basic', (error, user) => {
                try {
                    if (error || !user) {
                        return next(boom.unauthorized());
                    }

                    return req.login(user, { session: false }, async (error) => {
                        try {
                            if (error) {
                                return next(error);
                            }

                            const apiKey = await ApiKeysService.getApiKey({ token: apiKeyToken });

                            if (!apiKey) {
                                return next(boom.unauthorized());
                            }

                            const { id, email } = user;

                            const payload = {
                                sub: id,
                                email,
                                scopes: apiKey.scopes,
                            };
                            const token = jwt.sign(payload, config.authJwtSecret, { expiresIn: '15m' });

                            return res.json({ token, user: { id, email } });

                        } catch (error) {
                            return next(error);
                        };
                    });
                } catch (error) {
                    return next(error);
                }
            })(req, res, next);
        } catch (error) {
            return next(error);
        }
    });
}

module.exports = authApi;
