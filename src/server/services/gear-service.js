var connection = require('../config/connection');


function Gear() {

    this.get = function (res) {
        connection.acquire(function (err, con) {
            con.query('', function (err, result) {
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