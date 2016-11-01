(function() {
  'use strict';

  angular
    .module('gearTrend')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'glls',
        config: {
          url: '/glls',
          templateUrl: '/src/client/app/gear_trend/gear-trend.html',
          controller: 'gearTrendController',
          controllerAs: 'gt',
          title: 'Gear Trend'
        }
      }
    ];
  }
})();