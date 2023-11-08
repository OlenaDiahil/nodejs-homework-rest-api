const express = require('express')
const contactsController = require('../../controllers/contacts')
const wrapper = require('../../helpers/controllerWrapper')
const validate = require('../../middlewares/validationMiddleware')
const schema = require('../../schema/schema')

const router = express.Router()

router.get('/', wrapper(contactsController.listContacts))

router.get('/:contactId', wrapper(contactsController.getContactById))

router.post('/', validate(schema.contactSchema), wrapper(contactsController.addContact))

router.delete('/:contactId', wrapper(contactsController.removeContact))

router.put('/:contactId', validate(schema.contactSchema), wrapper(contactsController.updateContact))

router.patch('/:contactId/favorite', validate(schema.updateStatusContactSchema), wrapper(contactsController.updateStatusContact))

module.exports = router
