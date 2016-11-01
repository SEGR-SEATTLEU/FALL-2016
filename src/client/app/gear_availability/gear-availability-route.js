(function() {
  'use strict';

  angular
    .module('gearAvailability')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'gear_availability',
        config: {
          url: '/gear_availability',
          templateUrl: '/src/client/app/gear_availability/gear-availability.html',
          controller: 'gearAvailabilityController',
          controllerAs: 'ga',
          title: 'Gear Availability'
        }
      }
    ];
  }
})();