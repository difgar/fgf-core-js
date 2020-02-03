const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const debug = require('debug')('app:server');
const { config } = require('./src/config');
const usersApi = require('./src/router/users');
const authApi = require('./src/router/auth');
const { logErrors, wraperError, errorHanlder } = require('./src/utils/middleware/errorHandler');
const notFoundHandler = require('./src/utils/middleware/notFoundHandler');

const app = express();

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log'),
});

//Logger
app.use(morgan('combined', { stream: accessLogStream }));

//Body parser
app.use(express.json());

app.use(helmet());

//routers
authApi(app);
usersApi(app);

//Catch 404
app.use(notFoundHandler);

//Error Handler
app.use(logErrors);
app.use(wraperError);
app.use(errorHanlder);

app.listen(config.port, () => {
    debug(`Listening on http://localhost:${config.port}`);
});
