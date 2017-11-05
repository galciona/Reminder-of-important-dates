const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

const db = require('./configs_db/config');
const actionsDB = require('./configs_db/actions');
const routes = require('./routes');
const constants = require('./constants');

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if (req.hostname == 'localhost') {
        console.log('%s %s', req.hostname, req.url);
        next();
    } else res.send('Sorry!');
});

var timerConnectDb = setInterval(() => {
    MongoClient.connect(db.url, (err, database) => {
        if (err) {
            return console.log('Please, wait. We try conect to BD');
        } else {
            clearInterval(timerConnectDb);
            const databas = database;
            routes(app, database);
            app.listen(port, () => {
                console.log('MongoClient We are live on ' + port);
            });
            var timerId = setInterval(() => {
                actionsDB.checkAndSendMail(app, database);
            }, constants.TIME_CHECK_FOR_SEND_MESSAGE);
        }
    });
}, constants.TIME_CONNECT_AFTER_ERROR);

app.get('/', (req, res) => {
	res.send('Hello!');
});