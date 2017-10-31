var ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
    app.get('/employees/all', (req, res) => {
        db.collection('employees').find().toArray((err, items) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(items);
			}
		});
	});

    app.get('/employees/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('employees').findOne(details, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(item);
			}
		});
	});

    app.post('/employees', (req, res) => {
		const note = { 
			name:req.body.name, 
			surname: req.body.url,
			position: req.body.controls, 
			phone: req.body.apply, 
			email: req.body.remove, 
			birthday: req.body.remove,
			photo: req.body.remove,
			created: new Date()
		};

		db.collection('employees').insert(note, (err, result) => {
			if (err) { 
				res.send({ 'error': 'An error has occurred' +err }); 
			} else {
				res.send(result.ops[0]);
			}
		});
	});

    app.delete('/employees/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('employees').remove(details, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send('Note ' + id + ' deleted!');
			} 
		});
	});

    app.put('/employees/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		const note = { 
		    name: req.body.name,
		    surname: req.body.url,
		    position: req.body.controls,
		    phone: req.body.apply,
		    email: req.body.remove,
		    birthday: req.body.remove,
		    photo: req.body.remove,
		    created: new Date()
		};

		db.collection('employees').update(details, note, (err, result) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(note);
			} 
		});
    });

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