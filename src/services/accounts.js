const Accounts = require('../daos/acounts');
const { transformAccount } = require('../lib/dataTransform');

class AccountService {
    static async getAccounts() {
        let accounts = await Accounts.getAll();
        accounts = accounts ? transformAccount(accounts) : [];

        console.log('accounts', accounts.length);
        const mainAccount = accounts.filter((account) => !account.fatherAccountId);

        // eslint-disable-next-line no-use-before-define
        mainAccount.forEach((account) => { account.accounts = getSubAccount(accounts, account); }); // eslint-disable-line no-param-reassign
        return mainAccount;
    }
}

function getSubAccount(data, account) {
    const subAccount = data.filter((element) => element.fatherAccountId === account.id);
    if (subAccount.length === 0) {
        return [];
    }

    // eslint-disable-next-line no-param-reassign
    subAccount.forEach((element) => { element.accounts = getSubAccount(data, element); });
    return subAccount;
}

module.exports = AccountService;
