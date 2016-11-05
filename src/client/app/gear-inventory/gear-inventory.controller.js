(function() {
  'use strict';

  angular
    .module('wta.gear-inventory')
    .controller('GearInventoryController', GearInventoryController);

  GearInventoryController.$inject = ['logger', 'WtaApi'];

  //activate();
  function GearInventoryController(logger, WtaApi) {
    var vm = this;

    vm.gears = [];
    vm.headerText = 'Gear Inventory';

    vm.findAllGear = findAllGear;
    activate();
    
    /////////////////////

    function activate() {
      logger.info("Displayed Gear Inventory");
    }

    function findAllGear() {
      console.log("The findAllGear function has been called successfully");
      WtaApi.findAllGear().then(function(gears) {
        vm.gears = gears;
      });
    }
    
  }
})();