(function() {
  'use strict';

  angular.module('wta', [
      'wta.core',
	    'wta.create-request',
      'wta.request-summary',
      'wta.gear-availability-report',
      'wta.manage-returns'
  ])
  
  .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ]);

})();