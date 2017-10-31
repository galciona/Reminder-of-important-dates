console.log('* [example 1.1] sending test email');
const config = require('./config_mail');

module.exports = (recipient, countDays, name, isBirthday) => {
    let day = config.days;
    var send = require('gmail-send')({
        user: config.user,
        pass: config.pass,
        to: recipient
    });
    if (countDays === 1) day = config.day;
    if (isBirthday) {
        send({
            subject: config.subjectBirthday,
            text: config.textBirthday + name + config.textWillBe + countDays + day
        },()=>{});
    }else{
        send({
            subject: config.subjectStart,
            text: config.textStart + name + config.textWillBe + countDays + day
        },()=>{});
    }
}