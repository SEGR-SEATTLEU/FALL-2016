var express = require('express');
var app = express();

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/node_modules/angular'));
app.use(express.static(__dirname + '/node_modules/angular-route'));

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

app.get('/requestdetail', function(req, res, next) {
  var rqId = req.query.id;
  console.log('request detail called ' + rqId);
  res.redirect('requestdetail.html#?id=' + rqId);
});

app.get('/checkin', function(req, res, next) {
  var rqId = req.query.id;
  console.log('Going to update request with id ' + rqId + ' as verified returned');
  var qry = `CALL SetRequestStatus(\'${rqId}\', \'8\');`;
  connection.query(qry, function(err, rows, fields) {
    if (err) res.redirect('error.html');
    res.redirect('/requestdetail.html#?id=' + rqId);
   }); 
});

function separateRequestData(results) {
  var rqId = -1;
  var requests = [];
  var request;
  for(var i = 0; i < results.length; i++) {
    var currRqId = results[i].request_id;
    if(rqId != currRqId) {
      rqId = currRqId;
      if(i > 0) {
      requests.push(request);
      }
      request = { 
        requestId: results[i].request_id, 
        borrower: results[i].borrower,
        status: results[i].status,
        dueDate: results[i].due_date, 
        items: [] 
      };
    }
    request.items.push(results[i]);
  }
  if(typeof request != 'undefined') {
    requests.push(request);
  }
  return requests;
}

app.get('/data/returns', function(req, res, next) {
  var qry = 'CALL RequestsDueForReturn()';
  connection.query(qry, function(err, rows, fields) {
    if (err) res.send({ error: err });
    var requests = separateRequestData(rows[0]);
    res.send(requests);
   });
});

app.get('/data/requestdetail', function(req, res, next) {
  var rqId = req.query.id;
  console.log('data requestdetail called ' + rqId);
  var qry = `CALL ViewRequestDetail(\'${rqId}\');`;
  connection.query(qry, function(err, rows, fields) {
    if (err) res.send({ error: err });
    var requests = separateRequestData(rows[0]);
    res.send(requests);
   });
});

app.listen(3000);

console.log("App listening on port 3000");
