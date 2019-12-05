/* GET home page */
const login = function(req, res){ 
res.render('others-login', { title: 'Login' }); 
};

const register = function(req, res){ 
res.render('others-register', { title: 'Register' }); 
};

const about = function(req,res){
    res.render('about',{
        title: 'About'
    })
}

module.exports = { 
login, 
about,
register
};
