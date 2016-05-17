var chgpass = require('config/chgpass');
var register = require('config/register');
var addbook = require('config/addbook');
var login = require('config/login');
var user = require('config/models');
var book = require('config/bookmodel');
module.exports = function(app) {

     app.get('/', function(req, res) {
          res.end("Node-Android-Project");
     });
    app.get('/userlist', function(req, res) {
          //res.end("Im gonna show user's list");
          user.find({},function(err,users){
           res.send(users);
});
     });
     app.get('/bookslist', function(req, res) {
           //res.end("Im gonna show user's list");
           book.find({},function(err,users){
            res.send(users);
 });
      });
     app.post('/updateuser', function(req, res) {
           user.update({_id:req.body.id},{$set: {email:req.body.email}},function(err,updated){
              if ( err ) throw err;
              else {
                  res.send(updated);
              }

 });
      });
     app.post('/login',function(req,res){
          var email = req.body.email;
               var password = req.body.password;

          login.login(email,password,function (found) {
               console.log(found);
               res.json(found);
     });
     });

     app.post('/register',function(req,res){
          var email = req.body.email;
               var password = req.body.password;
          var bloodgroup = req.body.bloodgroup;
          var phonenum = req.body.phonenum;
          var city = req.body.city;
          var country = req.body.country;
          var username = req.body.username;
          console.log(req.body);
          console.log(password);
          register.register(email,password,bloodgroup,phonenum,city,country,username,function (found) {
               console.log(found);
               res.json(found);
     });
     });
     app.post('/addbook',function(req,res){
          var id = req.body.id;
          var lastdonated = req.body.lastdonated;
          var donationplace = req.body.donationplace;
          console.log(req.body);
          console.log(id);
          addbook.addbook(id,lastdonated,donationplace,function (found) {
               console.log(found);
               res.json(found);
     });
     });
     app.post('/api/chgpass', function(req, res) {
          var id = req.body.id;
               var opass = req.body.oldpass;
          var npass = req.body.newpass;

          chgpass.cpass(id,opass,npass,function(found){
               console.log(found);
               res.json(found);
     });
     });

     app.post('/api/resetpass', function(req, res) {

          var email = req.body.email;

          chgpass.respass_init(email,function(found){
               console.log(found);
               res.json(found);
     });
     });

     app.post('/api/resetpass/chg', function(req, res) {
          var email = req.body.email;
          var code = req.body.code;
          var npass = req.body.newpass;

     chgpass.respass_chg(email,code,npass,function(found){
          console.log(found);
          res.json(found);

     });
     });
};
