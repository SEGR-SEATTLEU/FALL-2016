(function() {
  'use strict';

  angular
    .module('wta.view-history-report')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'viewHistoryReport',
        config: {
          url: '/view-history-repot',
          templateUrl: '/src/client/app/view-history-report/view-history-report.html',
          controller: 'ViewHistoryReportController',
          controllerAs: 'vm',
          title: 'View History Report'
        }
      }
    ];
  }
})();