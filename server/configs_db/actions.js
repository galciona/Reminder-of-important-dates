var reqEmployees = require('./req _employees');
var reqSettings = require('./req _settings');
const mailSend = require('../mail_send');

const checkDate = (dayToDate, date, ifDay) => {
    let dateEvent = new Date(date);
    let now = new Date();

    let afteDaytoDate = new Date(new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf() + dayToDate);
    console.log("month: "+ dateEvent.getMonth() + " " + afteDaytoDate.getMonth() + " " + "day:" + dateEvent.getDate() + " " + afteDaytoDate.getDate());
    if ((dateEvent.getMonth() === afteDaytoDate.getMonth())
        && (dateEvent.getDate() === afteDaytoDate.getDate())) {
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