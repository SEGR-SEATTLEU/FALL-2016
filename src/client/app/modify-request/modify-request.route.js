(function() {
  'use strict';

  angular
    .module('wta.modify-request')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'modifyRequest',
        config: {
          url: '/modify-request',
          templateUrl: '/src/client/app/modify-request/modify-request.html',
          controller: 'ModifyRequestController',
          controllerAs: 'vm',
          title: 'Modify Request'
        }
      }
    ];
  }
})();