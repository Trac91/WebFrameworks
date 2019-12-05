const mongoose = require('mongoose');
const Diary = mongoose.model('contacts');

//const userRegister = function (req,res){
 //   res
 //   .status(200)
 //   .json({"status" : "success"});
//};

const userRegister = function(req, res){
    Diary.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    }, (err, contact) =>{
        if(err){
            res
            .status(400)
            .json(err);
        }else{
            res
            .status(201)
            .json({contact});
        }
    });
   
};

const userLogin = function (req ,res){
    if(req.params && req.params.userid){
        Diary
        .findById(req.params.userid)
        .exec((err,user) => {
            if(!user){
            res
            .status(404)
            .json({
                "message": "userid not found"
            });
            return;    
            } else if (err){
                res
                .status(404)
                .json(err);
                return;
             }
            res
            .status(200)
            .json(user);   
});
} else{
    res
    .status(404)
    .json({
        "message": "No userid in request"
    });
}
};
module.exports = {
    userRegister,
    userLogin
    
};

