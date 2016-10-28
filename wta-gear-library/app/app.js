angular.module('wta-gear-library', ['ngRoute'])

.controller("RequestDetailCtrl", function($scope, $http, $location) {
   var rqId = $location.search().id;
   if(typeof rqId == 'undefined') {
    $scope.requests = [{ 
              requestId: 'Error', 
              status: 'ID parameter not received',
              borrower: '',
              dueDate: '', 
              items: [] 
            }];
   } 
   else {
    $http.get('/data/requestdetail?id=' + rqId).
      success(function(data) {
        $scope.requests = data;
      }).
      error(function(data) {
        console.log('Problem connecting to db!');
      });
    }
})

.controller("ReturnsCtrl", function($scope, $http) {
  $http.get('/data/returns').
    success(function(data) {
      $scope.requests = data;
    }).
    error(function(data) {
      console.log('Problem connecting to db!');
    });
});