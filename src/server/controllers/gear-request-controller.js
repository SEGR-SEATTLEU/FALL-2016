var gearRequestService = require('../services/gear-request-service.js');

module.exports = {
    configure: function (app) {
        app.get('/request/', function (req, res) {
            gearRequestService.get(res);
        });

        app.post('/request/', function (req, res) {
            gearRequestService.post(req.body, res);
        });
    }
};