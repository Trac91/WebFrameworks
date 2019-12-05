const mongoose = require('mongoose');
const Diary = mongoose.model('Contacts');

const _buildContacts=function(req,res,results, stats){
    let contacts = [];
    results.forEach((doc)=>{
        contacts.push({
            firstName: doc.firstName,
            surname: doc.surname,
            email: doc.email,
            contact: doc.contact,
            address1: doc.address1,
            address2: doc.address2,
            town: doc.town,
            county: doc.county,
            eircode: doc.eircode,
            _id: doc.obj._id
            
        });
    });
    return contacts;
};
// done
module.exports.homelist = function(req,res){
    _buildContacts
    if(req.params){
        Diary
        .find({}, null,{limit : req.query.limit ? parseInt(req.query.limit) : 20})
        .exec(function(err,contact){
            if(!contact){
                sendJsonResponse(res,404,{"message" : "No match for this request"});
                return
            }
            else if(err){
                sendJsonResponse(res, 404, err);
                return
            }
            sendJsonResponse(res,200,contact)
        });

    }else{
        sendJsonResponse(res, 404,{"Message": "No request"});
    }
    
};

module.exports.addContact = function(req, res){
    Diary.create({
        firstName: req.body.firstName,
        surname: req.body.surname,
        address1: req.body.address1,
        address2: req.body.address2,
        town: req.body.town,
        county: req.body.county,
        eircode: req.body.eircode,
        email: req.body.email,
        contact: req.body.contact
    }, 
    function(err, contact){
        if(err){
           sendJsonResponse(res,400,err)
        }else{
            sendJsonResponse(res,201,contact)
        }
    });  
};


module.exports.viewContact = function(req,res){
    if(req.params && req.params.contactid){
        let id = req.params.contactid;
        Diary
        .findById(id)
        .exec(function(err,contact){
            if(!contact){
            sendJsonResponse(res,404,{"message": "No match for this contact"});
            return;
            } else if (err){
             sendJsonResponse(res,404,err);
                return;
             }
            sendJsonResponse(res,200,contact)  
        });
} else{
   sendJsonResponse(res,404,{
        "message": "No contactid in request"});
       
}
};
const contactsUpdateOne = function(req,res){
    if(!req.params.contactid){
        res
        .status(404)
        .json({
            "message": "Not found, contactid is required"
        });return;
    }
    Diary
    .findById(req.params.contactid)
    .select('contacts')
    .exec((err,contact) => {
        if(!contact){
            res
            .json(404)
            .status({
                "message": "contactid not found"
            });
            return;
        }
        else if(err){
            res
            .status(400)
            .json(err)
            return;
        }
        contact.firstName = req.body.firstName;
        contact.surname = req.body.surname;
        contact.address1 = req.body.address1;
        contact.address2 = req.body.address2;
        contact.town = req.body.town;
        contact.county = req.body.county;
        contact.eircode = req.body.eircode;
        contact.email = req.body.email;
        contact.contact = req.body.contact;
        contact.save((err,contact) =>{
            if(err){
                res
                .status(404)
                .json(err)
            }
            else{
                res
                .status(200)
                .json(contact);
            }
        });
    });
};

module.exports.contactsDeleteOne = function(req, res){
    const contactid = req.params.contactid;
    if(contactid){
        Diary
        .findByIdAndRemove(contactid)
        .exec((err, Diary) =>{
            if(err){
             sendJsonResponse(res,404,err);
                return; }
           sendJsonResponse(res,204,Diary);
        });
    }else{
        sendJsonResponse(res,404,{  "message": "no contactid" });
          
    }
};

//const contactsListAllContacts = function(req,res){
//Diary.find({}, function(err, contact){
//});
//};

//module.exports={
    //contactsCreate,
//    contactsListAllContacts,
    //contactsUpdateOne,
   //contactsReadOne,
  //  contactsDeleteOne
//};

var sendJsonResponse = function(res,status,content){
    res.status(status);
    res.json(content);
}

