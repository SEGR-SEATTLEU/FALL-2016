(function() {
  'use strict';

  angular
    .module('wta.widgets')
    .directive('header', header);

  function header() {
    //Usage:
    //<header></header>
    var directive = {
      scope: {
      },
      templateUrl: 'src/client/app/widgets/header/header.html',
      restrict: 'E'
    };
    return directive;
  }
})();