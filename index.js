const express = require('express');
const app = express();

const { config } = require('./config/index');
const usersApi = require('./router/users');
const { errorHanlder, logErrors } = require('./utils/middleware/errorHandler');

app.use(express.json());

usersApi(app);

app.use(logErrors);
app.use(errorHanlder);

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});