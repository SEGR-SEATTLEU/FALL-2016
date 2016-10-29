(function() {
  'use strict';
  
  var baseUrl = "http://localhost:8000";
  
  angular.module('wta.api')
    .factory('WtaApi', WtaApi);
  
  WtaApi.$inject = [ '$http', 'logger' ];
  function WtaApi( $http, logger ) {
    var vm = this;
    
    var service = {
      createRequest : createRequest,
      getAvailableGear: getAvailableGear
    }
    return service;
    
    /////////////////////
    
    function createRequest(startDate, endDate, gears) {
      var createRequestUrl = baseUrl + '/request/';
      var gearRequest = {
        "startdate": startDate,
        "enddate": endDate,
        "gears": gears
      }
      return $http.post(createRequestUrl, gearRequest)
        .then(createRequestComplete)
        .catch(createRequestFailed);
        
      function createRequestComplete(response) {
          return response.data;
      }
      
      function createRequestFailed(error) {
          logger.error('XHR Failed for POST CreateRequest '+error.data);
      }
    }

    function getAvailableGear(startDate, endDate) {
      var getAvailableGearUrl = baseUrl + '/gear_availability/';
      getAvailableGearUrl += '?startdate=' + startDate + '&enddate=' + endDate;
      return $http.get(getAvailableGearUrl)
        .then(getAvailableGearComplete)
        .catch(getAvailableGearFailed);

      function getAvailableGearComplete(response) {
        return response.data[0];
      }

      function getAvailableGearFailed(error) {
        logger.error('XHR Failed for GET AvailableGear ' + error.data);
      }
    }
    
  }
  
})();