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

router.get('/returns', function(req, res, next) {
  var dueDate = req.query.duedate;
  var qry = `CALL RequestsDueForReturn(\'${dueDate}\');`;
  connection.query(qry, function(err, rows, fields) {
    if (err) res.render('index', { title: 'error!' });
    res.render('managereturns', { results: rows[0] });
   }); 
});

router.get('/available', function(req, res, next) {
  var pickupDate = req.query.pickupdate;
  var returnDate = req.query.returndate;
  var qry = `CALL AvailableItems(\'${pickupDate}\', \'${returnDate}\');`;
  connection.query(qry, function(err, rows, fields) {
    if (err) res.render('index', { title: 'error!' });
    res.render('availableitems', { results: rows[0] });
  });
});



module.exports = router;
