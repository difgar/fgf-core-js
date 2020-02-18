const Movements = require('../daos/movements');
const { transformMovements } = require('../lib/dataTransform');

class MovementsService {
    static async getMovementsByPeriod(accountId, period) {
        const movements = await Movements.getMovementsByPeriod(accountId, period);
        return movements ? transformMovements(movements) : [];;
    }
}

module.exports = MovementsService;
