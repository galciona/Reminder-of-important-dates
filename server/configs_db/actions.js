var reqEmployees = require('./req _employees');
var reqSettings = require('./req _settings');
const mailSend = require('../mail_send');

const checkDate = (daysToDate, eventDate, ifDay) => {
    let eventDateF = new Date(eventDate);
    eventDateF.setDate(eventDateF.getDate() - daysToDate);
    let nowDate = new Date();
   
    console.log("eventDate => day: " + eventDateF);
    console.log("dayToDate => " + daysToDate);

    if ((eventDateF.getMonth() === nowDate.getMonth())
        && (eventDateF.getDate() === nowDate.getDate())) {
        ifDay();
    }
}

module.exports.checkAndSendMail = (app, db) => {

    reqSettings.get(db, (resSettings) => {
        settings = JSON.parse(JSON.stringify(resSettings));

        reqEmployees.getAll(db, (resEmployees) => {
            employees = JSON.parse(JSON.stringify(resEmployees));
            for (let item of employees) {
                console.log("employees " + JSON.stringify(item));

                checkDate(settings.days_to_date, item.created, () => {
                    mailSend(settings.email, settings.days_to_date, item.name + " " + item.surname, false);
                });

                checkDate(settings.days_to_date, item.birthday, () => {
                    mailSend(settings.email, settings.days_to_date, item.name + " " + item.surname, true);
                });
            }
        });
    });
}