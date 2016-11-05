(function() {
  'use strict';

  angular
    .module('wta.gear-trend')
    .controller('GearTrendController', GearTrendController);

  GearTrendController.$inject = ['logger', 'WtaApi'];
  function GearTrendController(logger, WtaApi) {
    var vm = this;

    vm.gearTrendList = [];
    vm.years = [];
    vm.selectedYear = "";
    vm.getGearTrend = getGearTrend;
    vm.headerText = 'Season Trend Report';

    activate();

    function activate() {
        var year = new Date().getFullYear();
        vm.selectedYear = year;
        vm.years.push(year);
        for(var i=1;i<20;i++) {
            vm.years.push(year + i);
        }
    }

    function getGearTrend() {
        WtaApi.getGearTrend(vm.selectedYear).then(function(gearTrendList) {
        vm.gearTrendList = gearTrendList;
      });
    }    
  }
})();