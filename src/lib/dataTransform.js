const { transform } = require('json-to-json-transformer');

const userTemplate = {
    id: '{{ID_PERSONA}}',
    typeId: '{{ID_TIPO_PERSONA}}',
    identification: '{{IDENTIFICACION}}',
    firstName: '{{PRIMER_NOMBRE}}',
    middleName: '{{OTROS_NOMBRES}}',
    lastName: '{{PRIMER_APELLIDO}}',
    secondLastName: '{{SEGUNDO_APELLIDO}}',
    birthday: '{{FECHA_NACIMIENTO}}',
    email: '{{EMAIL}}',
    password: '{{FECHA_NACIMIENTO}}',
    role: '{{ROLE}}',
};

const accountTemplate = {
    id: '{{ID_CUENTA}}',
    fatherAccountId: '{{ID_CUENTA_PADRE}}',
    societyId: '{{ID_SOCIEDAD}}',
    society: '{{SOCIEDAD}}',
    name: '{{NOMBRE}}',
    description: '{{DESCRIPCION}}',
    validSince: '{{VIGENCIA_DESDE}}',
    validUntil: '{{VIGENCIA_HASTA}}',
    referecenAccountId: '{{ID_CUENTA_REFERENCIA}}',
    must: '{{DEBE}}',
    have: '{{HABER}}',
    balance: '{{SALDO}}',
    accounts: '{{accounts}}',
};

const movementsTemplate = {
    id: '{{ID_MOVIMIENTO}}',
    accountId: '{{ID_CUENTA}}',
    account: '{{CUENTA}}',
    societyId: '{{ID_SOCIEDAD}}',
    society: '{{SOCIEDAD}}',
    date: '{{FECHA}}',
    description: '{{DESCRIPCION}}',
    must: '{{DEBE}}',
    have: '{{HABER}}',
    idTransaction: '{{ID_TRANSACCION}}',
};

const transformUser = (userData) => {
    return userData.map((user) => {
        return transform(userTemplate, user);
    });
};

const transformAccount = (accountData) => {
    return accountData.map((account) => {
        return transform(accountTemplate, account);
    });
};

const transformMovements = (movementsData) => {
    return movementsData.map((movements) => {
        return transform(movementsTemplate, movements);
    });
};

module.exports = { transformUser, transformAccount, transformMovements };
