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
            con.query('CALL CreateRequest(\'' + req.startdate + '\',\'' + req.enddate + '\', 1);', req, function (err, result) {
                con.release();    
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    console.log(result);
                    connection.acquire(function (err, con) {
                        for (var i = 0; i < req.gears.length; i++) {
                            con.query('CALL ReserveItem(' + result[0][0].RequestID + ',' + req.gears[i].quantity + ',' + req.gears[i].id + ');', req.gears, function (err, result) {
                                if (err) {
                                    console.log(err);
                                    throw err;
                                } else {
                                    res.send("Added all gears to the request");
                                    console.log(result);
                                }
                            });
                        }
                    });
                    con.release();                   
                }
            });    
        });
    };


}

module.exports = new Request();