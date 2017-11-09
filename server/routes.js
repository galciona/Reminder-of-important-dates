var reqEmployees = require('./configs_db/req _employees');
var reqSettings = require('./configs_db/req _settings');

module.exports = (app, db) => {
    app.get('/employees/all', (req, res) => {
        reqEmployees.getAll(db, (result) => { res.send(result); });
	});

    app.get('/employees/:id', (req, res) => {
        reqEmployees.get(db, req.params.id, (result) => { res.send(result); });
	});

    app.post('/employees', (req, res) => {
        reqEmployees.post(db, req.body, (result) => { res.send(result); });
    });

    app.delete('/employees/:id', (req, res) => {
        reqEmployees.delete(db, req.params.id, (result) => { res.send(result); });
	});

    app.put('/employees/:id', (req, res) => {
        reqEmployees.put(db, req.params.id, req.body, (result) => { res.send(result); });
    });

    app.get('/settings', (req, res) => {
        reqSettings.get(db, (result) => { res.send(result); });
    });

    app.put('/settings/:id', (req, res) => {
        reqSettings.put(db, req.params.id, req.body, (result) => { res.send(result); });
    });
};