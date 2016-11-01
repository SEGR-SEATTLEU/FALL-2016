var moreGearDetailsService = require('../services/more-gear-details-service.js');

module.exports = {
    configure: function (app) {  
        app.get('/more-details', function (req, res) {
          moreGearDetailsService.moredetails(req, res);
        });
    }
};