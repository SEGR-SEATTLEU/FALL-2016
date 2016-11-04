(function() {
  'use strict';

  angular
    .module('wta.gear-availability-report')
    .controller('GearAvailabilityReportController', GearAvailabilityReportController);

  GearAvailabilityReportController.$inject = ['logger', 'WtaApi'];

  //activate();
  function GearAvailabilityReportController(logger, WtaApi) {
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
    vm.headerText = 'Gear Availability Report';

    vm.findAvailableGear = findAvailableGear;
    vm.openStartPicker = openStartPicker;
    vm.openEndPicker = openEndPicker;
    vm.validDates = validDates;
    activate();
    
    /////////////////////

    function activate() {
      logger.info("Activated Create Request");
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

    function findAvailableGear() {
      console.log("The findAvailableGear function has been called successfully");
      var startDate = vm.startDate.toISOString().substring(0, vm.startDate.toISOString().indexOf('T'));
      var endDate = vm.endDate.toISOString().substring(0, vm.endDate.toISOString().indexOf('T'));
      WtaApi.getAvailableGear(startDate, endDate).then(function(gears) {
        vm.gears = gears;
      });
    }
    
  }
})();