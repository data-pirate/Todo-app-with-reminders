const nodemailer = require('nodemailer');
const log = require('log-to-file');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_MAIL,
        pass: process.env.MAIL_PASS
    }
});

const mailOptions = {
    from: process.env.MY_MAIL,
    to: 'myfriend@yahoo.com',
    subject: 'Reminder for Todo',
    text: 'That was easy!'
};

/**
 * requests user's email and composes the mail
 * @param {Object} param
 */
function send({ email, content }) {
    mailOptions.to = email;
    mailOptions.text = content;

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // log if there is any error
            log('Notifier module' + error, 'errorFile.log');
        } else {
            // log info about mail sent
            log(
                'Email sent: ' + info.response + ' \nsent to : ' + email,
                'sent-mails.log'
            );
        }
    });
}

module.exports = send;
