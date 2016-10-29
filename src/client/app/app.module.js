(function() {
  'use strict';
  
  angular.module('wta-gear-library', [])

  .controller("CheckinVerification", function($scope, $http, $location) {
     var id = $location.search().id;
     if(typeof id == 'undefined') {
      $scope.requests = [{ 
                requestId: 'Error', 
                status: 'ID parameter not received',
                borrower: '',
                dueDate: '', 
                items: [] 
              }];
     } 
     else {
      $http.get('http://localhost:8000/checkin?id=' + id).
        success(function(data) {
          $http.get('http://localhost:8000/requestdetail?id=' + id).
            success(function(data) {
              $scope.requests = data;
            }).
            error(function(data) {
              $scope.requests = [{ 
                requestId: 'Error', 
                status: 'ID parameter not received',
                borrower: '',
                dueDate: '', 
                items: [] 
              }];
            })
        }).
        error(function(data) {
          console.log('Problem connecting to db!');
        });
      }
  })

  .controller("Returns", function($scope, $http) {
    $http.get('http://localhost:8000/returns').
      success(function(data) {
        $scope.requests = data;
      }).
      error(function(data) {
        console.log('Problem connecting to db!');
      });
  })
  
  .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ]);

})();