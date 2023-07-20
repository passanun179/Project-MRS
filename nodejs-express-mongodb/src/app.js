const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/user');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res, 'content-length'), '-',
        tokens['response-time'](req, res),
    ].join('')
}))

const corsOptions ={
    origin: '*',
    methods: 'GET, HEAD, POST, PUT, PATCH, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200
}

app.use('/api/users', cors(corsOptions), userRouter);
const onStart = () => {
    console.log(`Server started on port ${PORT}`);
}

db.connect();

app.listen(PORT, onStart);