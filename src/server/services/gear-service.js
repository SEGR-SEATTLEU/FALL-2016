var connection = require('../config/db-connection');


function Gear() {

    this.get = function (req, res) {
        connection.acquire(function (err, con) {
            con.query('CALL Gear_Availability(\'' + req.query.startdate + '\',\'' + req.query.enddate + '\')', req, function (err, result) {
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

    this.post = function (res) {
        connection.acquire(function (err, con) {
            con.query('', function (err, result) {
            });
        });
    };

}

module.exports = new Gear();