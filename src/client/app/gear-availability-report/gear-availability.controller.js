(function() {
  'use strict';

  angular
    .module('wta.gear-availability-report')
    .controller('GearAvailabilityReportController', GearAvailabilityReportController);

  GearAvailabilityReportController.$inject = ['logger', 'WtaApi'];
  function GearAvailabilityReportController(logger, WtaApi) {
    var vm = this;

    vm.startDate = '10/31/2016';
    vm.endDate = '11/4/2016';
    vm.gears = [];
    vm.headerText = 'Gear Availability Report';

    vm.findAvailableGear = findAvailableGear;

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
    
  }
})();