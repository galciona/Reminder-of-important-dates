var ObjectID = require('mongodb').ObjectID;
var processingResult = require('./processing_result')

module.exports.get = (db, f) => {
    db.collection('settings').find().toArray((err, result) => {
        processingResult(err, result[0], f)
    });
};

module.exports.put = (db, id, param, f) => {
    const details = { '_id': new ObjectID(id) };
    const note = {
        email: param.email,
        days_to_date: param.days_to_date,
    };
    db.collection('settings').update(details, note, (err, result) => {
        processingResult(err, result.ops, f);
    });
};