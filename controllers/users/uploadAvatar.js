const User = require('../../models/user')
const path = require("path");
const fs = require("fs/promises")
const Jimp = require("jimp")

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const uploadAvatar = async (req, res, next) => {
    const { filename, path: tempUpload} = req.file
    const { _id } = req.user
    const imageName = `${_id}_${filename}`
    const img = await Jimp.read(tempUpload)
    await img.cover(250, 250).writeAsync(tempUpload);
    try {
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);
        const user = await User.findByIdAndUpdate(req.user._id, {
        avatarURL: `/public/avatars/${imageName}`,
        }, { new: true })
        res.status(200).json({avatarURL: user.avatarURL})
    } catch (error) {
        fs.unlink(tempUpload)
        next(error)
    }
}

module.exports = uploadAvatar