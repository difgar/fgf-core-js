const { usersMock } = require('../utils/mocks/usersMock');

class UsersService {
    async getUsers() {
        const users = await Promise.resolve(usersMock);
        return users || [];
    }

    async getUser({ userId }) {
        const users = await Promise.resolve(usersMock);
        console.log(userId);
        return users[0] || [];
    }

    async createUser({ user }) {
        const users = await Promise.resolve(usersMock);
        console.log(user);
        return users[1].id || 0;
    }

    async updateUser({ userId, user }) {
        const users = await Promise.resolve(usersMock);
        console.log(user + userId);
        return users[2].id || 0;
    }
}

module.exports = UsersService;