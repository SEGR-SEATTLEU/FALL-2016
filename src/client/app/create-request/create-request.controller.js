(function() {
  'use strict';

  angular
    .module('wta.create-request')
    .controller('CreateRequestController', CreateRequestController);

  CreateRequestController.$inject = ['logger', 'WtaApi'];

  function CreateRequestController(logger, WtaApi) {
    var vm = this;

    var date = new Date();
    vm.startDate = date;
    vm.endDate = date;

    vm.altInputFormats = ['M!/d!/yyyy'];

    vm.startDatePopup = {
      opened: false
    };

    vm.endDatePopup = {
      opened: false
    };

    vm.dateOptions = {
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    vm.gears = [];
    vm.initialGears = [];
    vm.needToCheckout = true;
    vm.headerText = 'Available Gear:';
    vm.requestSuccessful = false;
    vm.gearsWithValidQuantity = [];

    vm.findAvailableGear = findAvailableGear;
    vm.proceedToCheckout = proceedToCheckout;
    vm.createRequest = createRequest;
    vm.goBack = goBack;
<<<<<<< HEAD
    vm.validate = validate;
=======
    vm.invalidRequest = invalidRequest;
>>>>>>> 1408c3c5a0a1ed00049c0a42520a7937c90bab9f
    vm.openStartPicker = openStartPicker;
    vm.openEndPicker = openEndPicker;
    vm.validDates = validDates;

    activate();
    
    /////////////////////

    function activate() {
      logger.info("Activated Create Request");
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

    function openStartPicker() {
      vm.startDatePopup.opened = !vm.startDatePopup.opened;
    }

    function openEndPicker() {
      vm.endDatePopup.opened = !vm.endDatePopup.opened;
    }

    function validDates() {
      return vm.startDate <= vm.endDate;
    }
  }
})();