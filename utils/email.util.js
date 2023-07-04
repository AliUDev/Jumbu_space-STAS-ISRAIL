"use strict";
const { reject } = require("lodash");
const nodemailer = require("nodemailer");
const pug = require('pug');

let rand;
let host;
let link;

// async..await is not allowed in global scope, must use a wrapper
let nodeMailer = (req, getId) => new Promise((resolve, reject) => {
    try {
        const userName = req.body.email;
        // return
        rand = Math.floor((Math.random() * 100) + 54);
        host = req.get('host');
        link = "http://" + req.get('host') + "/api/users/verify/" + getId;
        // return
        let transporter = nodemailer.createTransport({
            host: 'smtp.elasticemail.com',
            port: 2525,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'faisalsaleem000786@gmail.com',
                pass: 'C8EEA7D5ECDC57B52D84A1A6F3384AD7FBBB'
            }
        });
        const html = pug.renderFile(`${__dirname}/../views/email/welcome.pug`, {
            userName,
            link,
        });
        let mailOptions = {
            from: '"Nodemailer Email Verification "<faisalsaleem000786@gmail.com>',
            to: userName,
            subject: "Email Verification",
            html: html,
        }

        transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                reject("Email could not sent due to " + error)
            } else {
                resolve("Email has been sent successfully Please verify Email to get register")
            }
        });
    } catch (error) {
        reject(error);
    }

})



module.exports = { nodeMailer }