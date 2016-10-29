var connection = require('../config/db-connection');
var moment = require('moment');

function Gear() {

    this.get = function (req, res) {
        var startDate = moment(req.query.startDate).format('YYYY-MM-DD');
        var endDate = moment(req.query.endDate).format('YYYY-MM-DD');
        connection.acquire(function (err, con) {
            con.query('CALL gear_availability(\'' + startDate + '\',\'' + endDate + '\')', req, function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    res.json(result[0]);
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