const express = require('express');
const router = express.Router();

/* GET home page. */
const ctrlContacts = require('../controllers/contacts'); 
const ctrlOthers = require('../controllers/others');
//const ctrlAbout = require('../controllers/about');

/* GET home page. */
router.get('/contacts', ctrlContacts.homelist); 


router.get('/contacts/list/new', ctrlContacts.addContact);
router
//.route('/,contacts/:contactid/list/new')
//.get(ctrlContacts.addContact)
//.post(ctrlContacts.doAddContact);





/* GET others  page. index/login */
router.get('/login', ctrlOthers.login);
router.get('/register', ctrlOthers.register);
router.get('/about',ctrlOthers.about);

module.exports = router;

