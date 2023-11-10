const User = require('../../models/user')
const requestError = require('../../helpers/requestError')
const sendEmail = require("../../helpers/sendEmail")

const repeatVerify = async (req, res) => {
    const {email} = req.body
    if (!email) {
        throw requestError(400, 'Missing required field email')
    }
    const user = await User.findOne({email}) 
    if (!user) {
        throw requestError(404, 'User not found')
    }

    if (user.verify) {
        throw requestError(404, 'Verification has already been passed')
    }
    await sendEmail({
        to: email,
        subject: "Please, confirm your email",
        html: `<h1>Please, confirm your email</h1><a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click here to confirm your email</a>`,
    })
    return res.json({message: 'Verification email sent'})
}

module.exports = repeatVerify;