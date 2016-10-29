(function() {
  'use strict';

  angular
    .module('wta.request-summary')
    .controller('RequestSummaryController', RequestSummaryController);

  RequestSummaryController.$inject = ['logger', 'WtaApi'];
  function RequestSummaryController(logger, WtaApi) {
    var vm = this;

    vm.startDate = '';
    vm.endDate = '';
    vm.requestDetails = [];
    vm.headerText = 'Gear Request';

    activate();
    
    /////////////////////

    function activate() {
      // TODO: take this request id as a route parameter from whatever other table links
      // to this page.
      getRequestDetails(3).then(function(requestDetails) {
        logger.info("Activated Request Summary"); 
      });
    }

    function getRequestDetails(requestID) {
      return WtaApi.getRequestSummary(requestID).then(function(requestDetails) {
        vm.requestDetails = requestDetails;
        vm.startDate = vm.requestDetails[0].start_date.substring(0, vm.requestDetails[0].start_date.indexOf('T'));
        vm.endDate = vm.requestDetails[0].end_date.substring(0, vm.requestDetails[0].end_date.indexOf('T'));
        return vm.requestDetails;
      });
    }

  }
})();