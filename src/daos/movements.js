const MysqlLib = require('../lib/dbConnection');

class Movements {
    static async getMovementsByPeriod(accountId, period) {
        let con;
        try {
            con = await MysqlLib.connect();
            await con.query('START TRANSACTION');
            const movements = await con.query(`select * from v_movimientos where id_cuenta=${accountId} and year(fecha)=${period}`);
            await con.query('COMMIT');
            return JSON.parse(JSON.stringify(movements));;
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

module.exports = Movements;
