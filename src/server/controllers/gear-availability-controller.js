var gearRequestService = require('../services/gear-availability-service.js');

module.exports = {
    configure: function (app) {
        app.all('*', function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });

        app.get('/gear_availability/', function (req, res) {
            gearRequestService.get(req, res);
        });
    }
};