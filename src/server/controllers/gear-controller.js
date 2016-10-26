var gearRequestService = require('../services/gear-service.js');

module.exports = {
    configure: function (app) {
        app.get('/gear_availability/', function (req, res) {

            gearRequestService.get(req, res);
        });

        /*app.post('/request/', function (req, res) {
            gearRequestService.post(req.body, res);
        });*/
    }
};