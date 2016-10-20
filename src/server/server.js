var express = require('express');
var connection = require('./config/db-connection');
var gearRequestController = require('./controllers/gear-request-controller');
var helloWorldController = require('./controllers/hello-world-controller');
var app = express();

connection.init();
gearRequestController.configure(app);
helloWorldController.configure(app);

var server = app.listen(8000, function () {
    console.log('Server listening on port ' + server.address().port);
});