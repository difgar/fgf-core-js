const { usersMock } = require('../utils/mocks/usersMock');
const debug = require("debug")("app:services");

class UsersService {
    async getUsers() {
        const users = await Promise.resolve(usersMock);
        return users || [];
    }

    async getUser({ userId }) {
        const users = await Promise.resolve(usersMock);
        debug(`userId: ${userId}`);
        return users[0] || [];
    }

    async createUser({ user }) {
        const users = await Promise.resolve(usersMock);
        debug(`user: ${user}`);
        return users[1].id || 0;
    }

    async updateUser({ userId, user }) {
        const users = await Promise.resolve(usersMock);
        debug(`userId: ${userId}, user: ${user}`);
        return users[2].id || 0;
    }
}

module.exports = UsersService;