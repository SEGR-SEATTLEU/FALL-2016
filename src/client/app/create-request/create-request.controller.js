(function() {
  'use strict';

  angular
    .module('wta.create-request')
    .controller('CreateRequestController', CreateRequestController);

  CreateRequestController.$inject = ['logger', 'WtaApi'];
  function CreateRequestController(logger, WtaApi) {
    var vm = this;

    vm.startDate = '10/31/2016';
    vm.endDate = '11/4/2016';
    vm.gears = [];
    vm.needToCheckout = true;
    vm.headerText = 'Available Gear:';
    vm.requestSuccessful = false;

    vm.findAvailableGear = findAvailableGear;
    vm.proceedToCheckout = proceedToCheckout;
    vm.createRequest = createRequest;

    activate();
    
    /////////////////////

    function activate() {
      logger.info("Activated Create Request");
      $("#pickupDatePicker").on("dp.change", function (e) {
          $('#returnDatePicker').data("DateTimePicker").minDate(e.date);
      });
      $("#returnDatePicker").on("dp.change", function (e) {
          $('#pickupDatePicker').data("DateTimePicker").maxDate(e.date);
      });
    }

    function findAvailableGear() {
      var startDate = vm.startDate.toISOString().substring(0, vm.startDate.toISOString().indexOf('T'));
      var endDate = vm.endDate.toISOString().substring(0, vm.endDate.toISOString().indexOf('T'));
      WtaApi.getAvailableGear(startDate, endDate).then(function(gears) {
        vm.gears = gears;
      });
    }

    function createRequest() {
      var startDate = vm.startDate.toISOString().substring(0, vm.startDate.toISOString().indexOf('T'));
      var endDate = vm.endDate.toISOString().substring(0, vm.endDate.toISOString().indexOf('T'));
      WtaApi.createRequest(startDate, endDate, vm.gears).then(function(res) {
        if( res === true ) {
          vm.requestSuccessful = true;
          vm.headerText = 'Request Submitted!';
        } else {
          // error handle
        }
      });
    }

    function proceedToCheckout() {
      $('#gear_request_table input').attr('readonly', 'readonly');
      vm.gears = vm.gears.filter(function(gear) {
        return gear.quantity !== 0 && gear.quantity !== null && gear.quantity !== undefined;
      });
      vm.needToCheckout = false;
      vm.headerText = 'Request Summary';
    }
    
  }
})();