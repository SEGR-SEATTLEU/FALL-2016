(function() {
  'use strict';

  angular
    .module('wta.create-request')
    .controller('CreateRequestController', CreateRequestController);

  CreateRequestController.$inject = ['logger', 'WtaApi'];

  function CreateRequestController(logger, WtaApi) {
    var vm = this;

    var date = new Date();
    vm.startDate = date.toISOString().substring(0, date.toISOString().indexOf('T'));
    vm.endDate = '';

    vm.gears = [];
    vm.initialGears = [];
    vm.needToCheckout = true;
    vm.headerText = 'Available Gear:';
    vm.requestSuccessful = false;
    vm.boolCheck = true;

    vm.findAvailableGear = findAvailableGear;
    vm.proceedToCheckout = proceedToCheckout;
    vm.createRequest = createRequest;
    vm.goBack = goBack;
    vm.validate = validate;

    activate();
    
    /////////////////////

    function activate() {
      logger.info("Activated Create Request");

      $('#returnDatePicker').datetimepicker({
          useCurrent: false, //Important! See issue #1075
          format: 'MM/DD/YYYY'
      });
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

    function goBack() {
      vm.needToCheckout = true;
      vm.gears = vm.initialGears;
      $('#gear_request_table input').attr('readonly', false);
      vm.headerText = 'Available Gear';
      $('.validator').show();
    }

    function validate(index) {
      vm.boolCheck = false;
      vm.gears.forEach(function(element) {
        if (element.quantity > element.QuantityAvailable) {
          vm.boolCheck = true;
        }
      }, this); 

      if (vm.boolCheck == true)
        $('#proceedToCheckout').attr('disabled', true);
      else
        $('#proceedToCheckout').attr('disabled', false);

    }
      

    function proceedToCheckout() {
      $('#gear_request_table input').attr('readonly', 'readonly');
      vm.initialGears = vm.gears;
      
      vm.gears = vm.gears.filter(function(gear) {
        return gear.quantity !== 0 && gear.quantity !== null && gear.quantity !== undefined;
      });
      vm.needToCheckout = false;
      vm.headerText = 'Request Summary';
      $('.validator').hide();
    }
  }
})();