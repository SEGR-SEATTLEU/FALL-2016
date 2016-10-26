var connection = require('../config/db-connection');

function Request() {

    // Getting request details
    this.get = function (res) {
        connection.acquire(function (err, con) {
            con.query('', function (err, result) {
            });
        });
    };

    // Creating Request and reserving the gears for the request.
    this.post = function (req, res) {
        connection.acquire(function (err, con) {
            con.query('CALL CreateRequest(\'' + req.startdate + '\',\'' + req.enddate + '\',\'' + JSON.stringify(req) + '\',1);', req, function (err, result) {
                con.release();    
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    console.log(result);                 
                }
            });    
        });
    };


}

module.exports = new Request();