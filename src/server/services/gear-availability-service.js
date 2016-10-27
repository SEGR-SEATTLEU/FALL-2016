var connection = require('../config/db-connection');
var moment = require('moment');

function Gear() {

    this.get = function (req, res) {
        var startDate = moment('2016-10-01').format('YYYY-MM-DD');
        var endDate = moment('2016-10-09').format('YYYY-MM-DD');
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