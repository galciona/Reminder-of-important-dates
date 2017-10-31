var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/settings', (req, res) => {
        db.collection('settings').find().toArray((err, items) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(items[0]);
            }
        });
    });

    app.put('/settings/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = {
            email: req.body.remove,
            days_to_date: req.body.remove,
        };
        db.collection('employees').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
            }
        });
    });
};