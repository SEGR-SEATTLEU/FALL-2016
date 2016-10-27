var app = angular.module('wta-gear-library', []);

function today() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

app.controller("ReturnsCtrl", function($scope, $http) {
  console.log('Returns control to request data');
  $http.get('/data/returns?duedate=2016-11-08'). //+ today()).
    success(function(data) {
      var results = data.results;
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
            dueDate: results[i].due_date, 
            items: [] 
          };
      	}
      	request.items.push(results[i]);
      }
      requests.push(request);
      $scope.requests = requests;
    }).
    error(function(data) {
      console.log('Problem connecting to db!');
    });
});