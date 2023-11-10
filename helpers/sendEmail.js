const nodemailer = require('nodemailer');
require("dotenv").config();

const { EMAIL_API_USER, EMAIL_API_PASSWORD, EMAIL_ADDRESS } = process.env

const sendEmail = async ({to, subject, html}) => {
    const email = {
        from: EMAIL_ADDRESS,
        to,
        subject,
        html
    };

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
            user: EMAIL_API_USER,
            pass: EMAIL_API_PASSWORD,
        },
        tls: {
            ciphers: 'SSLv3',
        },
    });

    await transport.sendMail(email);
}

module.exports = sendEmail