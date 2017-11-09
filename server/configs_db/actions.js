var reqEmployees = require('./req _employees');
var reqSettings = require('./req _settings');
const mailSend = require('../mail_send');

const checkDate = (daysToDate, eventDate, ifDay) => {

    let eventDateM = eventDate.split('-');
    let nowDatePlus = new Date(new Date().valueOf() + daysToDate*86400000)

    console.log("nowDatePlus => " + nowDatePlus);
    console.log("eventDate =>  " + eventDateM);
    console.log("dayToDate => " + nowDatePlus.getDate());

    if (((eventDateM[1]-1) == nowDatePlus.getMonth())
        && (eventDateM[2] == nowDatePlus.getDate())) {
        console.log("Sending!");
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