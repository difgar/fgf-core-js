const mysql = require('promise-mysql');
const { config } = require('../config');

class MysqlLib {
    static async connect() {
        if (!MysqlLib.pool) {
            MysqlLib.pool = await mysql.createPool({
                host: config.dbHost,
                port: config.dbPort,
                user: config.dbUser,
                password: config.dbPassword,
                database: config.dbName,
                connectionLimit: 3,
            });
        }
        return MysqlLib.pool.getConnection();;
    }

    getAll(colection, query) {
        return this.connection;
    }

    get(colection, id) {
        return this.connection;
    }

    create(colection, data) {
        return this.connection;
    }

    update(colection, id, data) {
        return this.connection;
    }

    delete(colection, id) {
        return this.connection.connect;
    }
}
module.exports = MysqlLib;
