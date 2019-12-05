const express = require('express');
const router = express.Router();
const ctrlContacts = require('../controllers/contacts');
//const ctrlOthers = require('../controllers/others');


//contatcs
router
	.route('/contacts')
	.get(ctrlContacts.homelist)
	//.post(ctrlContacts.addContact);
router
	.route('/contacts/:contactid')
	.get(ctrlContacts.viewContact)
	//.put(ctrlContacts.contactsUpdateOne)
	//.delete(ctrlContacts.contactsDeleteOne);

//others - login register
router
	.route('/others/register')
	//.get(ctrlOthers.usersListAllRegistered)
	//.post(ctrlOthers.userRegister);

router
	.route('others/:userid/login')
	//.get(ctrlOthers.userLogin)
	//.put(ctrlOthers.usersUpdateOne)
	//.delete(ctrlOthers.usersDeleteOne);




module.exports = router;

