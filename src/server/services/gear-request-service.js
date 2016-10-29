var connection = require('../config/db-connection');

function Request() {

    // Getting request details
    // pre: request params are the id of the gear request to get details for
    // post: gear request details are returned or error is logged
    this.get = function (id, rest) {
        connection.acquire(function (err, con) {
            con.query('CALL get_gear_request_details('+id+')', function (err, result) {
                con.release();
                if(err) {
                    console.log(err);
                    throw err;
                } else {
                    console.log(result);
                    res.send(result);
                }
            });
        });
    };

    // Creating Request and reserving the gears for the request.
    // pre: request params include startdate, enddate, JSON containing gears, UserID.
    // post: error is logged if request is not created successfully.
    this.post = function (req, res) {
        connection.acquire(function (err, con) {
            con.query('CALL create_request(\'' + req.startdate + '\',\'' + req.enddate + '\',\'' + JSON.stringify(req) + '\',1);', req, function (err, result) {
                con.release();    
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    console.log(result);
                    res.send(result);
                }
            });    
        });
    };

}

module.exports = new Request();