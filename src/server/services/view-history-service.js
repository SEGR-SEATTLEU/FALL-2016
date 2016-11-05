var connection = require('../config/db-connection');


function Request() {

    this.viewByTripLeader = function (req, res) {
        connection.acquire(function (err, con) {
            //con.query('CALL RequestHisotryByTripLeader(\'' + req.query.startdate + '\',\'' + req.query.enddate + '\')', req, function (err, result) {
            con.query('CALL RequestHistoryByTripLeader("Joe Gearborrower")', req, function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    //console.log(result);
                    res.send(result);
                }
            });
        });
    };

    this.viewByDate = function (req, res) {
        connection.acquire(function (err, con) {
            //con.query('CALL RequestHisotryByTripLeader(\'' + req.query.startdate + '\',\'' + req.query.enddate + '\')', req, function (err, result) {
            con.query('CALL RequestHistoryByDate("2016-11-05"' + ',' + '"2016-11-12")', req, function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    //console.log(result);
                    res.send(result);
                }
            });
        });
    };

}

module.exports = new Request();