var express = require('express');
var connection = require('./config/db-connection');
var bodyparser = require('body-parser');
var gearAvailabilityController = require('./controllers/gear-availability-controller');
var app = express();

// Configured app with body parser for accepting POST requests.
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());  

connection.init();
gearAvailabilityController.configure(app);

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var server = app.listen(8000, function () {
    console.log('Server listening on port ' + server.address().port);
});