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
      getAvailableGear: getAvailableGear,
      getRequestSummary: getRequestSummary,
      getReturns: getReturns,
      confirmReturn: confirmReturn,
      getGearRequests: getGearRequests,
      approveRequest: approveRequest,
      getGearTrend: getGearTrend,
      getHistoryByDate: getHistoryByDate,
      getHistoryByTripLeader: getHistoryByTripLeader

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

    function getRequestSummary(requestID) {
      var getRequestSummaryUrl = baseUrl + '/request/'+requestID;
      return $http.get(getRequestSummaryUrl)
        .then(getRequestSummaryComplete)
        .catch(getRequestSummaryFailed);

      function getRequestSummaryComplete(response) {
        return response.data[0];
      }

      function getRequestSummaryFailed(error) {
        logger.error('XHR Failed for Get RequestSummary ' + error.data);
      }
    }
    
    function getReturns() {
      console.log('Going to call get returns');
      var getReturnsUrl = baseUrl + '/returns/';
      return $http.get(getReturnsUrl)
        .then(getReturnsComplete)
        .catch(getReturnsFailed);

      function getReturnsComplete(response) {
        console.log('response for get returns received');
        console.log(response.data);
        console.log('number of returns ' + response.data.length);
        return response.data;
      }

      function getReturnsFailed(error) {
        logger.error('XHR Failed for Get RequestSummary ' + error.data);
      }
    }
    
    function confirmReturn(requestId) {
      var confirmReturnsUrl = baseUrl + '/returns/confirm?id=' + requestId;
      return $http.get(confirmReturnsUrl)
        .then(confirmReturnsComplete)
        .catch(confirmReturnsFailed);

      function confirmReturnsComplete(response) {
        return response.data;
      }

      function confirmReturnsFailed(error) {
        logger.error('XHR Failed for Get RequestSummary ' + error.data);
      }
    }

    function getGearRequests() {
      var getGearRequestsUrl = baseUrl + '/get_requests/';
      return $http.get(getGearRequestsUrl)
        .then(getGearRequestsComplete)
        .catch(getGearRequestsFailed);

      function getGearRequestsComplete(response) {
        return response.data[0];
      }

      function getGearRequestsFailed(error) {
        logger.error('XHR Failed for GET GearRequests' + error.data);
      }
    }

    function approveRequest(requestId) {
      var approveRequestUrl = baseUrl + '/approve_request/?requestId='+requestId;
      return $http.post(approveRequestUrl,"")
        .then(approveRequestComplete)
        .catch(approveRequestFailed);
        
      function approveRequestComplete(response) {
          return response.data;
      }
      
      function approveRequestFailed(error) {
          logger.error('XHR Failed for POST ApproveRequest '+error.data);
      }
    }

    function getGearTrend(year) {
      var gearTrendUrl = baseUrl + '/gear_trend/?trendYear='+year;
      return $http.get(gearTrendUrl)
        .then(gearTrendComplete)
        .catch(gearTrendFailed);
        
      function gearTrendComplete(response) {
          return response.data[0];
      }
      
      function gearTrendFailed(error) {
          logger.error('XHR Failed for POST GearTrend '+error.data);
      }
    }

    function getHistoryByDate(startDate, endDate) {
      var getHistoryUrl = baseUrl + '/view_history_byDate/';
      getHistoryUrl += '?startdate=' + startDate + '&enddate=' + endDate;
      return $http.get(getHistoryUrl)
        .then(getHistoryComplete)
        .catch(getHistoryFailed);

      function getHistoryComplete(response) {
        return response.data[0];
      }

      function getHistoryFailed(error) {
        logger.error('XHR Failed for GET History by Date ' + error.data);
      }
    }

    function getHistoryByTripLeader(name) {
      var getHistoryUrl = baseUrl + '/view_history_byTripLeader/';
      getHistoryUrl += '?name=' + name;
      return $http.get(getHistoryUrl)
        .then(getHistoryComplete)
        .catch(getHistoryFailed);

      function getHistoryComplete(response) {
        return response.data[0];
      }

      function getHistoryFailed(error) {
        logger.error('XHR Failed for GET History by Date ' + error.data);
      }
    }
    
  }
  
})();