(function() {
  'use strict';

  angular
    .module('wta.gear-availability-report')
    .controller('GearAvailabilityReportController', GearAvailabilityReportController);

  GearAvailabilityReportController.$inject = ['logger', 'WtaApi'];
  function GearAvailabilityReportController(logger, WtaApi) {
    var vm = this;

    vm.startDate = '';
    vm.endDate = '12/12/2016';
    vm.gears = [];
    vm.headerText = 'Gear Availability Report';

    vm.findAvailableGear = findAvailableGear;

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
      var startDate = vm.startDate.toISOString().substring(0, vm.startDate.toString().indexOf('T'));
      var endDate = vm.endDate.toISOString().substring(0, vm.endDate.toString().indexOf('T'));
      WtaApi.getAvailableGear(startDate, endDate).then(function(gears) {
        vm.gears = gears;
      });
    }
    
  }
})();