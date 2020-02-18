const debug = require('debug')('app:services');
const Users = require('../daos/users');
const { transformUser } = require('../lib/dataTransform');

const { usersMock } = require('../utils/mocks/usersMock');

class UsersService {
    static async getUsers() {
        const users = await Users.getAll();
        return users ? transformUser(users) : [];
    }

    static async getUser({ userId }) {
        const users = await Promise.resolve(usersMock);
        debug(`userId: ${userId}`);
        return users[0] || [];
    }

    static async createUser({ user }) {
        const users = await Promise.resolve(usersMock);
        debug(`user: ${user}`);
        return users[1].id || 0;
    }

    static async updateUser({ userId, user }) {
        const users = await Promise.resolve(usersMock);
        debug(`userId: ${userId}, user: ${user}`);
        return users[2].id || 0;
    }
}

module.exports = UsersService;
