(function() {
  'use strict';

  angular.module('todo.api')
    .constant('StorageServicePicker', StorageServicePicker());
    
  function StorageServicePicker() {
      return 'Local Storage';
  }

})();