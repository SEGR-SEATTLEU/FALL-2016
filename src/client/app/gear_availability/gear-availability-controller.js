(function() {
  'use strict';

  var baseUrl = "http://localhost:8000/gear_availability";

  angular
    .module('gearAvailability')
    .controller('gearAvailabilityController', gearAvailabilityController);

  gearAvailabilityController.$inject = ['logger','$http'];
  function gearAvailabilityController(logger,$http) {
    var ga = this;
    ga.gearAvailabilityList = [];
    ga.startDate = "";
    ga.endDate = "";
    ga.getGearAvailability = getGearAvailability;
    
    activate();

    function activate() {
        getGearAvailability();
        logger.info('Activated Gear Availability Controller');
    }
    
    function getGearAvailability() {
      return $http.get(baseUrl)
        .then(availabilityList)
        .catch(availabilityError);
    }
        
      function availabilityList(response) {
          ga.gearAvailabilityList = response.data;
      }
      
      function availabilityError(error) {
          logger.error('Cannot get gear availability '+error.data);
      }
    
    }
})();