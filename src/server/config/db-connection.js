// Creating connection pool for mysql server
// Limiting the maximum number of connections to 10

var mysql = require('mysql');

function Connection() {
    this.pool = null;
    this.init = function () {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host     : 'localhost',
            user     : 'expressuser',
            database : 'wta',
            password : 'pa55w0rD'
        });
    };

    this.acquire = function (res) {
        this.pool.getConnection(function (err, connection) {
            res(err, connection);
        });
    };
}

module.exports = new Connection();
