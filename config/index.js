require('dotenv').config();

const config = {
    dev: process.env.MODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
    adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN
};

module.exports = { config };