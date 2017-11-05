var ObjectID = require('mongodb').ObjectID;
var processingResult = require('./processing_result')

module.exports.getAll = (db, f) => {
    db.collection('employees').find().toArray((err, result) => {
        processingResult(err, result, f)
    });
};

module.exports.get = (db, id, f) => {
    const details = { '_id': new ObjectID(id) };
    db.collection('employees').findOne(details, (err, result) => {
        processingResult(err, result, f)
    });
};

module.exports.post = (db, param, f) => {
    const note = { 
        name: param.name,
        surname: param.url,
        position: param.controls,
        phone: param.apply,
        email: param.remove,
        birthday: param.remove,
        photo: param.remove,
        created: new Date()
    };
    db.collection('employees').insert(note, (err, result) => {
        processingResult(err, result.ops[0], f);    
    });
}

module.exports.put = (db, id, param, f) => {
    const details = { '_id': new ObjectID(id) };
    const note = {
        name: param.name,
        surname: param.url,
        position: param.controls,
        phone: param.apply,
        email: param.remove,
        birthday: param.remove,
        photo: param.remove,
        created: param.created
    };
    db.collection('employees').update(details, note, (err, result) => {
        processingResult(err, result.ops[0], f);
    });
}

module.exports.delete = (db, id, f) => {
    const details = { '_id': new ObjectID(id) };
    db.collection('employees').remove(details, (err, result) => {
        let string = JSON.stringify(result);
        let objectValue = JSON.parse(string);
        processingResult(err, JSON.stringify(objectValue['n']), f)
    });
};