var connection = require('../config/db-connection');

function Request() {

    // Getting request details
    // pre:
    // post: 
    this.get = function (res) {
        connection.acquire(function (err, con) {
            con.query('', function (err, result) {
            });
        });
    };

    // Getting additional gear details
    // pre: submit id of gear item
    // post: returns the image url, care instructions, size table, desc,
    this.moredetails = function (req, res) {
        var id = req.query.id;
        console.log('data requestdetail called ' + id);
        var qry = `CALL GetMoreGearDetails(\'${id}\');`;
        connection.acquire(function (err, con) {
            con.query(qry, req, function (err, rows) {
                con.release();    
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    res.send(result);
                }
            });
        });
    };


}

module.exports = new Request();