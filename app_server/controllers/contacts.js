/* GET 'home' page */
const request = require('request');

const apiOptions = {server : 'http://localhost:3000'};
if(process.env.NODE_ENV ==='production'){apiOptions.server = ' https://diary2point0.herokuapp.com';
}
// Newly added
// Method callig api request and return an object
const homelist = function (req, res){
	console.log(req.query);

	var requestOptions, path;
	path = '/api/contacts';
	requestOptions ={
		url : apiOptions.server + path,
		method : "GET",
		json: {},
		qs : {}
	}
	request(
		requestOptions,
		function(err,response,body){
		_renderHomepage(req,res,body);
	})
};

const addContact = function(req,res){
	console.log('addContact')
	var requestOptions, path;

	path = '/api/contacts/'
	requestOptions = {
		url: apiOptions.server + path,
		method : "PUT",
		json : {
			firstName : req.params.firstName,
			surname : req.params.surname,
			address1 : req.params.address1,
			address2 : req.params.address2,
			county : req.params.county,
			eircode : req.params.eircode,
			email : req.params.email,
			contact : req.params.contact	
		},
		qs : {}
	}
		request(
			requestOptions,
			function(err,response,body){
				res.render('contacts-add-form')
			}
			)
	}
//	var doAddContact = function(req,res,contacts){

	
const _renderHomepage = function(req,res, content){
		let message = null;
		if(!content.lenght){
			message = "No contacts Found"
			
		}
		res.render('contacts-list',{
			contacts : content,
			message : message,
			pageHeader:{
					title:'Diary2.0',
					strapLine:'This is the strapLine'
				 },
		})
			
	}

const _renderDetailPage = function (req, res, conDetail) { 
	res.render('contact-view', { 
		title: conDetail.firstName + conDetail.surname,
		pageHeader:{
			title: conDetail.firstName + conDetail.surname,
			strapLine: 'All your contacts in one place. '
		},
	contact: conDetail
	});
	};
	
	const contactInfo = function(req, res){
		const path = '/api/contacts/${req.params.contactid}';
		requestOptions = {
			url : apiOptions.server + path,
			method : 'GET',
			json : {}
		};
		request(requestOptions,(err,response,body) =>{
			_renderDetailPage(req, res); 
		});
	
	};
	
	const viewContact = function(req,res){
		const path = '/api/contacts/${req.params.contactid}';
		requestOptions = {
			url : apiOptions.server + path,
			method : 'GET',
			json : {},
			qs : {}
		}
		request(requestOptions,function(err,response,body){
			_renderDetailPage(req,res,body);
		}
		)
	};



module.exports = {
homelist,
contactInfo,
addContact,
//doAddReview,
//contactsReadOne,
viewContact
};

//const _renderHomepage = function(req, res, responseBody){
//	let message = null;
//	if(!(responseBody instanceof Array)){
//		message = "API lookup error";
//		responseBody = [];
//	}
//	else{
//		if(!responseBody.length){
//			message = "No Contacts found"
//		}
//	}
//	res.render('contacts-list', {
//		title: 'Diary2.0 - The simple solution for all your contact needs',
//	pageHeader:{
//		title: 'Diary2.0',
//		strapLine: 'All your contacts in one place. '
//		},
//		contacts: responseBody,
	//	message: message
//});
//};
