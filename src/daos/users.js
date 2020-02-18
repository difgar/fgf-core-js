const MysqlLib = require('../lib/dbConnection');

class Users {
    static async getAll() {
        let con;
        try {
            con = await MysqlLib.connect();
            await con.query('START TRANSACTION');
            let data = await con.query('SELECT * FROM personas');
            await con.query('COMMIT');
            data = JSON.parse(JSON.stringify(data));
            return data;
        } catch (ex) {
            console.log(ex);
            throw ex;
        } finally {
            if (con) {
                await con.release();
                await con.destroy();
            }
        }
    }
}

module.exports = Users;
