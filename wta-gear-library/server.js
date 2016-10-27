var express = require('express');
var app = express();

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/node_modules/angular'));

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'expressuser',
  database : 'wta',
  password : 'pa55w0rD'
});

connection.connect();

app.get('/returns', function(req, res, next) {
  res.redirect('returns.html');
});

app.get('/data/returns', function(req, res, next) {
  var dueDate = req.query.duedate;
  console.log('Request for returns called with due date ' + dueDate);
  var qry = `CALL RequestsDueForReturn(\'${dueDate}\');`;
  connection.query(qry, function(err, rows, fields) {
    if (err) res.send({ error: err });
    res.send({ results: rows[0] });
   }); 
});

app.listen(3000);

console.log("App listening on port 3000");
