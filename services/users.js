const { usersMock } = require('../utils/mocks/usersMock');

class UsersService {
    async getUsers() {
        const users = await Promise.resolve(usersMock);
        return users || [];
    }
}

module.exports = UsersService;