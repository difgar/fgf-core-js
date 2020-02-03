const { apiKeysMock } = require('../utils/mocks/apiKeysMock');

class ApiKeysService {
    static async getApiKey({ token }) {
        const apiKeys = await Promise.resolve(apiKeysMock);
        const ak = apiKeys.find((element) => element.token === token);
        return ak;
    }
}

module.exports = ApiKeysService;
