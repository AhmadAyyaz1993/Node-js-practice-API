/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var express  = require('express');
var connect = require('connect');
var app      = express();
var port     = process.env.PORT || 8080;
// Configuration
app.use(express.static(__dirname + '/public'));
app.use(connect.logger('dev'));
app.use(connect.json()); 
app.use(connect.urlencoded());
mongoose.connect('mongodb://ahmad1993:Pakistan123@ds023052.mlab.com:023052/node-android');
//mongodb://<dbuser>:<dbpassword>@ds023052.mlab.com:23052/node-android
// Routes

require('./routes/routes.js')(app);

app.listen(port);

console.log('The App runs on port ' + port);
