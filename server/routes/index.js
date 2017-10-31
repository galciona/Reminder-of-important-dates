const noteRoutesEmployees = require('./routes_employees');
const noteRoutesSettings = require('./routes_settings');

module.exports = (app, db) => {
    noteRoutesSettings(app, db);
};

module.exports = (app, db) => {
    noteRoutesEmployees(app, db);
};