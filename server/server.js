var express = require('express');
var Firebase = require('firebase');
// var myRootRef = new Firebase('https://myprojectname.firebaseIO-demo.com/');

var app = express();

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;