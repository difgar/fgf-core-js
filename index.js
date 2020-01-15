const express = require('express');
const app = express();

const { config } = require('./config/index');

app.get('/', (req, res) => {
    res.send('hello word');
});

app.get('/json', (req, res) => {
    res.json({ hello: 'word' });
});

app.get('/year/:year', (req, res) => {
    const date = new Date(req.params.year, 1, 29);
    res.send(`Es bisiesto?: ${date.getMonth() === 1}`);
});

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});