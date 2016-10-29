(function() {
  'use strict';

  angular
    .module('todo.core', [
      'ngAnimate', 'ngSanitize',
      'blocks.exception', 'blocks.logger', 'blocks.router',
      'ui.router'
    ]);
})();