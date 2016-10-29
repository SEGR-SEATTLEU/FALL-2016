var express = require('express');
var connection = require('./config/db-connection');
var bodyparser = require('body-parser');
var gearReturnsController = require('./controllers/returns-controller');
var gearRequestController = require('./controllers/gear-request-controller');
var gearController = require('./controllers/gear-controller');
var helloWorldController = require('./controllers/hello-world-controller');
var app = express();


// Configured app with body parser for accepting POST requests.
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());  

app.all('*', function(req, res, next) {
             res.header('Access-Control-Allow-Origin', '*');
             res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
             res.header('Access-Control-Allow-Headers', 'Content-Type');
             next();
         });

connection.init();
gearRequestController.configure(app);
helloWorldController.configure(app);
gearReturnsController.configure(app);
gearController.configure(app);

var server = app.listen(8000, function () {
    console.log('Server listening on port ' + server.address().port);
});