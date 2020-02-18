const MysqlLib = require('../lib/dbConnection');

class Accounts {
    static async getAll() {
        let con;
        try {
            con = await MysqlLib.connect();
            await con.query('START TRANSACTION');
            const accounts = await con.query('SELECT * FROM v_saldos');
            await con.query('COMMIT');
            return JSON.parse(JSON.stringify(accounts));;
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

module.exports = Accounts;
