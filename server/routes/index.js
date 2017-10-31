const noteRoutesEmployees = require('./note_routes_employees');
const noteRoutesSettings = require('./note_routes_settings');

module.exports = (app, db) => {
    noteRoutesSettings(app, db);
};

module.exports = (app, db) => {
    noteRoutesEmployees(app, db);
};