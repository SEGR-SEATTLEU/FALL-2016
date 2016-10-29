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
    
    function getGearAvailability() {
      return $http.get(baseUrl + "?startDate=" + ga.startDate + "&endDate=" + ga.endDate)
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