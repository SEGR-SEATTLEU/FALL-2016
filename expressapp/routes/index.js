var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'expressuser',
  database : 'wta',
  password : 'pa55w0rD'
});

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/available', function(req, res, next) {
  connection.query('CALL AvailableItems(\'2016-11-04\', \'2016-11-08\');', function(err, rows, fields) {
    if (err) res.render('index', { title: 'error!' });
    res.render('availableitems', { results: rows[0] });
  });
});

module.exports = router;
