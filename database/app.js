(function() {
  var app = angular.module('Inventory', []);

  app.controller('InventoryController', function(){
    var items = [{
      name: 'Jacket',
      description: "Black fleece."
    },{
        name: 'Boots',
        description: "Brown work boots."
    }];

    this.gears = items;
  });
  
})();