const { usersMock } = require('../utils/mocks/usersMock');

class UsersService {
    static async getUser({ email }) {
        const users = await Promise.resolve(usersMock);
        return users.find((user) => user.email === email);
    }
}

module.exports = UsersService;
