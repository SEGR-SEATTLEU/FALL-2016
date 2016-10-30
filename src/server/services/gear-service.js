var connection = require('../config/db-connection');


function Gear() {

    this.get = function (req, res) {

        var startdate = req.query.startdate;
        var enddate = req.query.enddate;
        console.log('received startdate of ' + startdate);
        console.log('received enddate of ' + enddate);

        connection.acquire(function (err, con) {
            if(typeof con.query == 'undefined') {
              console.log('Bazunda!!');
            }
            con.query('CALL Gear_Availability(\'' + startdate + '\',\'' + enddate + '\')', req, function (err, result) {
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

module.exports = new Gear();