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
    let now = new Date();
    const note = { 
        name: param.name,
        surname: param.surname,
        position: param.position,
        phone: param.phone,
        email: param.email,
        birthday: param.birthday,
        photo: param.photo,
        created: now.getFullYear() + "-" + now.getMonth() +"-" + now.getDate()
    };
    db.collection('employees').insert(note, (err, result) => {
        processingResult(err, result.ops[0], f);    
    });
}

module.exports.put = (db, id, param, f) => {
    const details = { '_id': new ObjectID(id) };
    const note = {
        name: param.name,
        surname: param.surname,
        position: param.position,
        phone: param.phone,
        email: param.email,
        birthday: param.birthday,
        photo: param.photo,
        created: param.created
    };
    db.collection('employees').update(details, note, (err, result) => {
        processingResult(err, result.ops, f);
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