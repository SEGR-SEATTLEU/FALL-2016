(function() {
  'use strict';

  angular
    .module('wta.view-history-report')
    .controller('ViewHistoryReportController', ViewHistoryReportController);

  ViewHistoryReportController.$inject = ['logger', 'WtaApi'];

  //activate();
  function ViewHistoryReportController(logger, WtaApi) {
    var vm = this;

    var date = new Date();
    vm.startDate = date.toISOString().substring(0, date.toISOString().indexOf('T'));
    vm.endDate = '';
    vm.reports = [];
    vm.headerText = 'View History Report';

    vm.getHistoryReport = getHistoryReport;

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

    function getHistoryReport() {
      var startDate = vm.startDate.toISOString().substring(0, vm.startDate.toISOString().indexOf('T'));
      var endDate = vm.endDate.toISOString().substring(0, vm.endDate.toISOString().indexOf('T'));
      WtaApi.getHistoryByDate(startDate, endDate).then(function(gears) {
        vm.reports = gears;
      });
    }
    
  }
})();