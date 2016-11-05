(function() {
  'use strict';

  angular
    .module('wta.gear-inventory')
    .controller('GearInventoryController', GearInventoryController);

  GearInventoryController.$inject = ['logger', 'WtaApi'];

  //activate();
  function GearInventoryController(logger, WtaApi) {
    var vm = this;
    vm.gearid = 

    var nTemp = 10;
    vm.gearid = nTemp;
    vm.gearquantity = nTemp;
    vm.gears = [];
    vm.headerText = 'Gear Inventory';

    vm.findAllGear = findAllGear;
    vm.updateGearQuantity = updateGearQuantity;
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

    function updateGearQuantity() {
      var gearid = vm.gearid;
      var gearquantity = vm.gearquantity;
      WtaApi.updateGearQuantity(gearid, gearquantity).then(function(res) {
        if( res === true ) {
          vm.requestSuccessful = true;
          vm.headerText = 'Gear Quantity Updated!';
        } else {
          // error handle
        }
      });
    }
    
  }
})();