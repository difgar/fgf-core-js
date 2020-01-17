const express = require('express');
const app = express();

const { config } = require('./config/index');
const usersApi = require('./router/users');
const { logErrors, wraperError, errorHanlder } = require('./utils/middleware/errorHandler');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

//Body parser
app.use(express.json());

//routers
usersApi(app);

//Catch 404
app.use(notFoundHandler);

//Error Handler
app.use(logErrors);
app.use(wraperError);
app.use(errorHanlder);

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});