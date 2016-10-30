(function() {
  'use strict';

  angular
    .module('wta.manage-returns')
    .controller('ManageReturnsController', ManageReturnsController);

  ManageReturnsController.$inject = ['logger', 'WtaApi'];
  function ManageReturnsController(logger, WtaApi) {
    var vm = this;

    vm.requests = [];
    vm.headerText = 'Manage Returns';

    activate();
    
    /////////////////////

    function activate() {
      // TODO: take this request id as a route parameter from whatever other table links
      // to this page.
      getReturns().then(function(requests) {
        logger.info("Activated Request Summary"); 
      });
    }

    function getReturns() {
      return WtaApi.getReturns().then(function(requests) {
        console.log('in manage returns controller, setting vm.requests');
        vm.requests = requests;
        console.log(vm.requests);
        return vm.requests;
      });
    }

  }
})();