var express = require('express');
var connection = require('./config/db-connection');
var bodyparser = require('body-parser');
var gearAvailabilityController = require('./controllers/gear-availability-controller');
var gearTrendController = require('./controllers/gear-trend-controller');
var app = express();

// Configured app with body parser for accepting POST requests.
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());  

connection.init();
gearAvailabilityController.configure(app);
gearTrendController.configure(app);

var server = app.listen(8000, function () {
    console.log('Server listening on port ' + server.address().port);
});