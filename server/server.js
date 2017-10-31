const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config_db');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
	if (err) {
		return console.log(err);
	}

	require('./routes')(app, database);
	app.listen(port, () => {
	    console.log('MongoClient We are live on ' + port);
	});
});

app.use((req, res, next) => {
	console.log('%s %s', req.method, req.url);
	next();
});

app.get('/', (req, res) => {
	res.send('Hello!');
});