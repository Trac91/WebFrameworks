const mongoose = require('mongoose');
const contactsSchema = new mongoose.Schema({
	firstName:{
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
address1: {
        type: String,
        required: true
    },
address2: { 
        type: String,
        required: true },
town: {
        type: String,
        required: true
    },
county: {
        type: String,
        required: false
    },
eircode: {
        type: String,
        required: false
    },

});
 mongoose.model('Contacts', contactsSchema);


