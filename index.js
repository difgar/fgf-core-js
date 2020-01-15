const express = require('express');
const app = express();

const { config } = require('./config/index');
const usersApi = require('./router/users');

usersApi(app);

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});