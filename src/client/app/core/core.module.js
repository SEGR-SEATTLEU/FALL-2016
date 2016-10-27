(function() {
  'use strict';

  angular
    .module('glls.core', [
      'ngAnimate', 'ngSanitize',
      'blocks.exception', 'blocks.logger', 'blocks.router',
      'ui.router'
    ]);
})();