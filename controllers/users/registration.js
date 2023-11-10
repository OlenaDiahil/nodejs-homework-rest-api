/* eslint-disable no-undef */
const User = require('../../models/user')
const requestError = require ('../../helpers/requestError')
const bcrypt = require('bcrypt')
const gravatar = require("gravatar");
const { nanoid } = require('nanoid')
const sendEmail = require("../../helpers/sendEmail")

const registration = async (req, res, next) => { 
    verificationCode = nanoid();
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const { email } = req.body;
    const avatarURL = gravatar.url(email);
    const userInBase = await User.findOne({email});
    if (userInBase) {
        throw requestError(409, "Email in use")
    }
    const user = await User.create({...req.body,
        avatarURL,
        verificationToken: verificationCode,
    })
    await sendEmail({
        to: email,
        subject: "Please, confirm your email",
        html: `<h1>Please, confirm your email</h1><a href="http://localhost:3000/api/users/verify/${verificationCode}">Click here to confirm your email</a>`,
    })

    res.status(201).json(user) 
}

module.exports = registration