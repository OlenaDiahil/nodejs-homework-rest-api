const express = require('express');
const router = express.Router();
const controller = require('../../controllers/users');
const wrapper = require('../../helpers/controllerWrapper')
const auth = require('../../middlewares/authorizationMiddleware')
const uploadFile = require('../../middlewares/uploadFile')


router.post('/registration', wrapper(controller.registration))
router.post('/login', wrapper(controller.login));
router.post('/logout',wrapper(auth) , wrapper(controller.logout));
router.get('/current', wrapper(auth), wrapper(controller.current));
router.patch('/avatars', uploadFile.single('avatar'), wrapper(auth), wrapper(controller.uploadAvatar))
router.get('/verify/:verificationToken', wrapper(controller.verify))
router.post('/verify', wrapper(controller.repeatVerify))

module.exports = router;